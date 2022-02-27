using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public interface ICommentService
    {
        public Task<bool> DeleteCommentAsync(Comment comment);
        public Task<bool> EditCommentAsync(Comment comment, string content);
        public Task<bool> VoteCommentAsync(Comment comment, bool isUpvote, string userId);
        public Task<List<Comment>> GetAllPostCommentsAsync(Guid postId);
        public Task<bool> AddCommentAsync(Comment comment, Guid postId);
        public Task<bool> UserOwnsCommentAsync(Guid commentId, string sserId);
        public Task<Comment> GetCommentByIdAsync(Guid commentId);
    }
}
