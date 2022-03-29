using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    public class IdentityController : Controller
    {
        private readonly IIdentityService _identityService;
        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost(ApiRoutes.Identity.Register)]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = ModelState.Values.SelectMany(x => x.Errors.Select(y => y.ErrorMessage))
                });
            }
            var authResponse = await _identityService.RegisterAsync(request.Email, request.Username, request.Password);
            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }
            return Ok("We've sent a confirmation e-mail on the address you've provided.");
        }

        [HttpPost(ApiRoutes.Identity.Promote)]
        public async Task<IActionResult> Promote([FromBody] UserPromotionRequest request)
        {
            var roles = new string[] { "Admin", "Moderator", "User", "Creator" };
            if (!ModelState.IsValid)
            {
                return BadRequest(new PromotionFailedResponse
                {
                    Errors = ModelState.Values.SelectMany(x => x.Errors.Select(y => y.ErrorMessage))
                });
            }
            if (!roles.Contains(request.Role))
            {
                return BadRequest(new PromotionFailedResponse
                {
                    Errors = new string [] { "Incorrect role." }
                });
            }
            if (request.Role == "Admin")
            {
                return Unauthorized("You don't have permisions to do this.");
            }
            var authResponse = await _identityService.PromoteUserAsync(request.Username, request.Role);
            if (!authResponse.Succeeded)
            {
                return BadRequest(new PromotionFailedResponse
                {
                    Errors = authResponse.Errors.Select(x => x.Description)
                });
            }
            return Ok($"User has been promoted to {request.Role}");
        }

        [HttpPost(ApiRoutes.Identity.Login)]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var authResponse = await _identityService.LoginAsync(request.Credential, request.Password);
            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }
            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpPost(ApiRoutes.Identity.Refresh)]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
        {
            var authResponse = await _identityService.RefreshTokenAsync(request.Token, request.RefreshToken);
            if (!authResponse.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = authResponse.Errors
                });
            }
            return Ok(new AuthSuccessResponse
            {
                Token = authResponse.Token,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpGet(ApiRoutes.Identity.Confirm)]
        public async Task<IActionResult> Confirm([FromRoute] string userId, [FromRoute] string token)
        {
            var confirmation = await _identityService.ConfirmEmailAsync(userId, token);
            if (!confirmation.Success)
            {
                return BadRequest(new AuthFailedResponse
                {
                    Errors = confirmation.Errors
                });
            }
            return Ok(new AuthSuccessResponse
            {
                Token = confirmation.Token,
                RefreshToken = confirmation.RefreshToken
            });
        }
    }
}
