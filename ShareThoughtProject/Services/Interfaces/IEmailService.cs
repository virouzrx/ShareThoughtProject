using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services.Interfaces
{
    public interface IEmailService
    {
        public Task<string> Send(string receiver, string token, string userId);
    }
}
