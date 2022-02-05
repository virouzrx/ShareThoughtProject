using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ShareThoughtProject.Services
{
    public class HashtagService : IHashtagService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public HashtagService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateNewHashtagAsync(Hashtag hashtag)
        {
            await _dbContext.Hashtags.AddAsync(hashtag);
            var created = await _dbContext.SaveChangesAsync();
            return created > 0;
        }

        public async Task<List<Hashtag>> GetAllHashtags()
        {
            return await _dbContext.Hashtags.ToListAsync();
        }

        public async Task<List<Hashtag>> GetTagsByNameAsync(List<string> tagNames)
        {
            List<Hashtag> hashtags = new();
            foreach (var tag in tagNames)
            {
                var hashtag = await _dbContext.Hashtags.Where(x => x.HashtagName == tag.ToLower()).SingleOrDefaultAsync();
                if (hashtag != null)
                    hashtags.Add(hashtag);
            }
            return hashtags;
        }

        public async Task<bool> UpdateHashtagFollowersCount(Hashtag hashtag, bool follow)
        {
            if (follow)
                hashtag.AmountOfHashtagFollowers++;
            else
                hashtag.AmountOfHashtagFollowers--;

            _dbContext.Hashtags.Update(hashtag);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }
    }
}
