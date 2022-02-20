using System.Threading.Tasks;
using static ShareThoughtProject.Domain.AutoModerationResult;

namespace ShareThoughtProject.Services
{
    public interface IPerspectiveApiService
    {
        public Task<AutoModerationStatus> AutoModerateComment(string content);
    }
}
