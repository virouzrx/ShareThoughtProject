﻿using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
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
            var comments = await _dbContext.Comments.Where(x => x.PostId == guidPostId).ToListAsync();
            var ordered = comments.OrderByDescending(x => x.Created).ToList();
            return ordered;
        }

        public async Task<List<Comment>> GetAllPostCommentsPaginatedAsync(Guid postId, int pageSize, int pageNumber)
        {
            var guidPostId = postId;
            var comments = await _dbContext.Comments.Where(x => x.PostId == guidPostId).ToListAsync();
            
            var commentsSkipped = comments.Skip((pageNumber - 1) * pageSize).ToList();
            if (commentsSkipped.Count > pageSize)
            {
                return commentsSkipped.Take(pageSize).OrderByDescending(x => x.Created).ToList();
            }
            return commentsSkipped;
        }

        public async Task<List<Comment>> GetUsers5LastComments(string userId)
        {
            var comments = await _dbContext.Comments
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.Created)
                .Take(5)
                .ToListAsync();
            return comments;
        }

        public async Task<bool> VoteCommentAsync(Comment comment, bool isUpvote, string userId)
        {
            if (isUpvote)
                comment.CommentScore++;
            else
                comment.CommentScore--;
            var vote = new CommentVote
            {
                CommentId = comment.Id,
                IsLike = isUpvote,
                UserId = userId, 
                VoteDate = DateTime.Now
            };
            _dbContext.CommentsVotes.Add(vote);
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
