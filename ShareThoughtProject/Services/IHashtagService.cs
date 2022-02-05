using ShareThoughtProject.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public interface IHashtagService
    {
        public Task<List<Hashtag>> GetAllHashtags();
        public Task<List<Hashtag>> GetTagsByNameAsync(List<string> tagNames);
        public Task<bool> CreateNewHashtagAsync(Hashtag hashtag);
        public Task<bool> UpdateHashtagFollowersCount(Hashtag hashtag, bool follow);
    }
}
