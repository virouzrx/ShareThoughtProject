using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using ShareThoughtProjectApi.Interfaces;
using ShareThoughtProjectApi.Options;
using ShareThoughtProjectApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly JwtSettings _jwtSettings;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly ShareThoughtDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IUserService _userService;

        public IdentityService(UserManager<AppUser> userManager, JwtSettings jwtSettings, TokenValidationParameters tokenValidationParameters,
            ShareThoughtDbContext context, IEmailService emailService, IUserService userService)
        {
            _userManager = userManager;
            _jwtSettings = jwtSettings;
            _tokenValidationParameters = tokenValidationParameters;
            _context = context;
            _emailService = emailService;
            _userService = userService;
        }

        public async Task<AuthenticationResult> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var codeDecodedBytes = WebEncoders.Base64UrlDecode(token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            if (user == null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "No user with provided e-mail found." }
                };
            }
            var result = await _userManager.ConfirmEmailAsync(user, codeDecoded);
            if (result.Succeeded)
            {
                user.EmailConfirmed = true;
                return await GenerateAuthenticationResultForUserAsync(user);
            }
            else
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "There was an error while trying to confirm an email." }
                };
            }
        }

        public async Task<AuthenticationResult> LoginAsync(string credential, string password)
        {
            var isEmail = IsCredentialAnEmail(credential);
            AppUser appUser;
            if (isEmail)
            {
                appUser = await _userManager.FindByEmailAsync(credential);
            }
            else
            {
                appUser = await _userManager.FindByNameAsync(credential);
            }
           
            if (appUser == null || await _userManager.CheckPasswordAsync(appUser, password) == false)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Incorrect e-mail address or password." }
                };
            }
            if (!appUser.EmailConfirmed)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email address not confirmed." }
                };
            }
            return await GenerateAuthenticationResultForUserAsync(appUser);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            var validatedToken = GetPrincipalFromToken(token);
            if (validatedToken == null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Invalid Token" }
                };
            }

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x => x.Token.ToString() == refreshToken);
            if (storedRefreshToken == null)
            {
                return new AuthenticationResult { Errors = new[] { "This refresh token does not exist" } };
            }
            if (DateTime.UtcNow > storedRefreshToken.ExpiryDate)
            {
                return new AuthenticationResult { Errors = new[] { "This refresh token has expired" } };
            }
            if (storedRefreshToken.Invalidated)
            {
                return new AuthenticationResult { Errors = new[] { "This refresh token has been invalidated" } };
            }
            if (storedRefreshToken.Used)
            {
                return new AuthenticationResult { Errors = new[] { "This refresh token has been used" } };
            }
            if (storedRefreshToken.JwtId != jti)
            {
                return new AuthenticationResult { Errors = new[] { "This refresh token does not match this JWT" } };
            }
            storedRefreshToken.Used = true;
            _context.RefreshTokens.Update(storedRefreshToken);
            await _context.SaveChangesAsync();

            var user = await _userManager.FindByIdAsync(validatedToken.Claims.Single(x => x.Type == "id").Value);
            return await GenerateAuthenticationResultForUserAsync(user);
        }

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
                if (!IsJwtWithValidSecurityAlgorithm(validatedToken))
                {
                    return null;
                }
                return principal;
            }
            catch
            {
                return null;
            }
        }

        private bool IsCredentialAnEmail(string credential)
        {
            if (!MailAddress.TryCreate(credential, out _))
            {
                return false;
            }
            return true;
        }

        private bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken)
        {
            return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
                jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase);
        }

        public async Task<AuthenticationResult> RegisterAsync(string email, string username, string password)
        {
            var existingUserByEmailAddress = await _userManager.FindByEmailAsync(email);
            if (existingUserByEmailAddress != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "User with this e-mail address already exists" }
                };
            }
            var existingUserByUsername = await _userManager.FindByNameAsync(username);
            if (existingUserByUsername != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "User with this username already exists" }
                };
            }
            var newUser = new AppUser
            {
                Email = email,
                Joined = DateTime.Now,
                UserName = username,
                EmailConfirmed = true
            };
            var createdUser = await _userManager.CreateAsync(newUser, password);
            var asignee = await _userManager.FindByEmailAsync(email);
            await _userManager.AddToRoleAsync(asignee, "User");
            if (!createdUser.Succeeded)
            {
                return new AuthenticationResult
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }
            var user = await _userService.GetUserByUsername(username);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
            var message = await _emailService.Send(email, codeEncoded, user.Id);

            return new AuthenticationResult
            {
                Success = true,
                Message = message
            };
        }

        private async Task<AuthenticationResult> GenerateAuthenticationResultForUserAsync(AppUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var userRoles = await _userManager.GetRolesAsync(user);
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("id", user.Id),
                    new Claim("username", user.UserName)
                }),
                Expires = DateTime.MaxValue,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            foreach (var item in userRoles)
            {
                tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, item));
            }

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(3)
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthenticationResult
            {
                Success = true,
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken.Token.ToString()
            };
        }
    }
}
