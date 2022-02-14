using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Domain;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public interface IFlagService
    {
        Task<bool> FlagPostAsync(Post post);
        Task<bool> FlagCommentAsync(Comment comment);

    }
}
