using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public class CommentService : ICommentService
    {
        private readonly ShareThoughtDbContext _dbContext;
        private readonly IPostService _postService;
        public CommentService(ShareThoughtDbContext dbContext, IPostService postService)
        {
            _dbContext = dbContext;
            _postService = postService;
        }

        public async Task<bool> AddCommentAsync(Comment comment, Guid postId)
        {
            await _dbContext.Comments.AddAsync(comment);
            var created = await _dbContext.SaveChangesAsync();
            return created > 0;
        }

        public async Task<List<Comment>> GetAllPostCommentsAsync(Guid postId)
        {
            var guidPostId = postId;
            return await _dbContext.Comments.Where(x => x.PostId == guidPostId).ToListAsync();
        }

        public async Task<bool> VoteCommentAsync(Comment comment, bool isUpvote)
        {
            comment.CommentScore.Vote(isUpvote);
            _dbContext.Comments.Update(comment);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> EditCommentAsync(Comment comment, string content)
        {
            comment.Content = content;
            _dbContext.Comments.Update(comment);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> DeleteCommentAsync(Comment comment)
        {
            _dbContext.Remove(comment);
            var deleted = await _dbContext.SaveChangesAsync();
            return deleted > 0;
        }

        public async Task<bool> UserOwnsCommentAsync(Guid commentId, string userId)
        {
            return await _dbContext.Comments.AsNoTracking().AnyAsync(x => x.Id == commentId && x.UserId == userId);
        }

        public async Task<Comment> GetCommentByIdAsync(Guid commentId)
        {
            var x = await _dbContext.Comments.SingleOrDefaultAsync(x => x.Id == commentId);
            return x;
        }
    }
}
