using ShareThoughtProject.Domain;
using System.Threading.Tasks;

namespace ShareThoughtProject.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
    }
}
