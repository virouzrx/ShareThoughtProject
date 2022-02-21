using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public class UserService : IUserService
    {
        private readonly ShareThoughtDbContext _context;
        public UserService(ShareThoughtDbContext context)
        {
            _context = context;
        }
        public async Task<List<AppUser>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsCreatedByUser(string userId)
        {
            return await _context.Comments.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<List<Hashtag>> GetHashtagsFollowedByUser(string userId)
        {
            var hashtagIds = await _context.HashtagFollows
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();
            List<Hashtag> hashtags = new();
            foreach (var item in hashtagIds)
            {
                hashtags.Add(await _context.Hashtags.Where(x => x.Id == item).FirstOrDefaultAsync());
            }
            return hashtags;
        }

        public async Task<List<Post>> GetPostsCreatedByUser(string userId)
        {
            var posts = await _context.Posts.Where(x => x.UserId == userId).ToListAsync();
            return posts;
        }

        public async Task<AppUser> GetUserById(string userId)
        {
           return await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByUsername(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
        }
    }
}
