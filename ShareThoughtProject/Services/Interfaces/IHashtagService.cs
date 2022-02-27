using ShareThoughtProjectApi.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public interface IHashtagService
    {
        public Task<List<Hashtag>> GetAllHashtags();
        public Task<List<Hashtag>> GetTagsByNameAsync(List<string> tagNames);
        public Task<bool> CreateNewHashtagAsync(Hashtag hashtag);
        public Task<bool> UpdateHashtagFollowersCount(Hashtag hashtag, string userId);
        public Task<List<Hashtag>> GetMostPopularHashtags();
        public Task<List<Hashtag>> GetRisingHashtags();
    }
}
