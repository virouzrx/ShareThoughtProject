using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public interface IFlagService
    {
        Task<bool> FlagPost { get; set; }
        Task<bool> FlagComment { get; set; }

    }
}
