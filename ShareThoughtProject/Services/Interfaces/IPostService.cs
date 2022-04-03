using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Contracts.ApiRoutes;

namespace ShareThoughtProjectApi.Services
{
    public interface IPostService
    {
        Task<List<Post>> GetPostsAsync();
        Task<Post> GetPostByIdAsync(Guid postId);
        Task<bool> UpdatePostAsync(Post postToUpdate);
        Task<bool>DeletePostAsync(Guid postId);
        Task<bool> CreatePostAsync(Post post);
        Task<bool> UserOwnsPostAsync(Guid postId, string getUserId);
        Task<List<Post>> GetPostsByHashtagAsync(Hashtag hashtags);
        Task<List<Hashtag>> GetHashtagsAsync();
        Task<bool> VotePostAsync(Post post, bool isUpvote, string userId);
        public Task<List<Post>> GetPopularPostsThisWeek();
        public Task<List<Post>> GetTodaysPopularPostsAsync();
        public Task<List<Post>> GetNewPosts(int pageSize, int pageNumber);
        public Task<List<Post>> GetPostsByPhrase(string phrase, int pageSize, int pageNumber);
    }
}
