using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace ShareThoughtProjectApi.Services
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

        public async Task<bool> UpdateHashtagFollowersCount(Hashtag hashtag, string userId)
        {
            var existingHasthagFollow = _dbContext.HashtagFollows.Where(x => x.UserId == userId && x.HashtagId == hashtag.Id).FirstOrDefault();
            if (existingHasthagFollow != null)
            {
                _dbContext.HashtagFollows.Remove(existingHasthagFollow);
                hashtag.AmountOfHashtagFollowers--;
            }
            else
            {
                var newHashtagFollow = new HashtagFollow
                {
                    UserId = userId,
                    HashtagId = hashtag.Id,
                    FollowDate = DateTime.Now
                };
                _dbContext.HashtagFollows.Add(newHashtagFollow);
                hashtag.AmountOfHashtagFollowers++;
            }
            _dbContext.Hashtags.Update(hashtag);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<List<Hashtag>> GetMostPopularHashtags()
        {
            throw new NotImplementedException();
        }

        public Task<List<Hashtag>> GetRisingHashtags()
        {
            throw new NotImplementedException();
        }
    }
}
