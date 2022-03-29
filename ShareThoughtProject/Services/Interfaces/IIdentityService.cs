using Microsoft.AspNetCore.Identity;
using ShareThoughtProjectApi.Domain;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string username, string password);
        Task<AuthenticationResult> LoginAsync(string credential, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
        Task<AuthenticationResult> ConfirmEmailAsync(string email, string token);
        Task<IdentityResult> PromoteUserAsync(string username, string role);
    }
}
