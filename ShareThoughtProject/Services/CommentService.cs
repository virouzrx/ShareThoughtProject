using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{

    //todo - add repository pattern for easier db access
    public class CommentService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public CommentService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddComment(Comment comment)
        {
            await _dbContext.Comments.AddAsync(comment);
            var created = await _dbContext.SaveChangesAsync();
            return created > 0;
        }

        public async Task<List<Comment>> GetAllPostComments(string postId)
        {
            var guidPostId = Guid.Parse(postId);
            return await _dbContext.Comments.Where(x => x.PostId == guidPostId).ToListAsync();
        }

        public async Task<bool> VoteComment(Comment comment, bool isUpvote)
        {
            comment.CommentScore.Vote(isUpvote);
            _dbContext.Comments.Update(comment);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> DeleteComment(Comment comment)
        {
            _dbContext.Remove(comment);
            var deleted = await _dbContext.SaveChangesAsync();
            return deleted > 0;
        }

        public async Task<bool> UpdateHashtagFollowersCount(Hashtag hashtag, bool follow)
        {
            hashtag.AmountOfHashtagFollowers.Vote(follow);
            _dbContext.Hashtags.Update(hashtag);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }
    }
}
