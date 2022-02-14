using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public class FlagService : IFlagService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public FlagService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> FlagPostAsync(Post post)
        {
            _dbContext.Posts.Update(post);
            var flagged = await _dbContext.SaveChangesAsync();
            return flagged > 0;
        }

        Task<bool> IFlagService.FlagCommentAsync(Comment comment)
        {
            throw new System.NotImplementedException();
        }
    }
}
