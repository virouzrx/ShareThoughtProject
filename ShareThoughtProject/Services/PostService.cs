using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public class PostService : IPostService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public PostService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<bool> CreatePostAsync(Post post)
        {
            await _dbContext.Posts.AddAsync(post);
            var created = await _dbContext.SaveChangesAsync();
            return created > 0;
        }
        public async Task<bool> DeletePostAsync(Guid postId)
        {
            var post = await GetPostByIdAsync(postId);
            if (post == null)
            {
                return false;
            }
            _dbContext.Posts.Remove(post);
            var deleted = await _dbContext.SaveChangesAsync();
            return deleted > 0;
        }

        public async Task<Post> GetPostByIdAsync(Guid postId)
        {
            return await _dbContext.Posts.SingleOrDefaultAsync(x => x.Id == postId);
        }
        
        public async Task<List<Post>> GetPostsAsync()
        {
            return await _dbContext.Posts.ToListAsync();
        }

        public async Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            _dbContext.Posts.Update(postToUpdate);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> UserOwnsPostAsync(Guid postId, string userId)
        {
            return await _dbContext.Posts.AsNoTracking().AnyAsync(x => x.Id == postId && x.UserId == userId);
        }
    }
}
