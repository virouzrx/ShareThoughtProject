using System.Threading.Tasks;

namespace ShareThoughtProject.Services.Interfaces
{
    public interface IEmailService
    {
        public Task<string> Send(string receiver, string token, string userId);
    }
}
