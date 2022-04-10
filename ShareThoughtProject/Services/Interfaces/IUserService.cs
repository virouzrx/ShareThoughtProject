using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public interface IUserService
    {
        public Task<AppUser> GetUserById(string userId);
        public Task<AppUser> GetUserByUsername(string username);
        public Task<List<AppUser>> GetAllUsers();
        public Task<List<Hashtag>> GetHashtagsFollowedByUser(string userId);
        public Task<List<Comment>> GetCommentsCreatedByUser(string userId);
        public Task<List<Post>> GetPostsCreatedByUser(string userId);
        public Task<bool> SetUserPhoto(string base64, string userId);
        public Task<bool> SetUserDescription(string description, string userId);
        public Task<List<AppUser>> GetUsersByPhrase(string phrase, int pageSize, int pageNumber);
        public Task<UserInfoResponse> AddUserInfo(UserInfoResponse response);
    }
}
