using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.AutoModerationResult;

namespace ShareThoughtProjectApi.Services
{
    public interface IPerspectiveApiService
    {
        public Task<AutoModerationStatus> AutoModerateComment(string content);
    }
}
