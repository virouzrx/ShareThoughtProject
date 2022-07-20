using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public class PostService : IPostService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public PostService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> VotePostAsync(Post post, bool isUpvote, string userId)
        {
            var postAuthor = await _dbContext.Users.Where(x => x.Id == post.UserId).FirstOrDefaultAsync();
            var existingVote = await _dbContext.PostVotes.Where(x => x.PostId == post.Id && x.UserId == userId).FirstOrDefaultAsync();
            if (existingVote != null)   
            {
                if (existingVote.IsLike == isUpvote) //if user clicked the same button twice
                {
                    _dbContext.PostVotes.Remove(existingVote);
                    if (isUpvote)
                    {
                        post.Score--;
                        postAuthor.PostScore--;
                    }
                    else
                    {
                        post.Score++;
                        postAuthor.PostScore++;
                    }
                    _dbContext.Users.Update(postAuthor);
                    _dbContext.Posts.Update(post);
                    var updateSuccessful = await _dbContext.SaveChangesAsync();
                    return updateSuccessful > 0;
                }
                else //if user clicked different button
                {
                    _dbContext.PostVotes.Remove(existingVote);
                }
            }
            if (isUpvote)
            {
                int tempScore = post.Score;
                tempScore++;
                post.Score = tempScore;
                postAuthor.PostScore++;
            }
            else
            {
                int tempScore = post.Score;
                tempScore--;
                postAuthor.PostScore--;
                post.Score = tempScore;
            }
            var vote = new PostVote
            {
                PostId = post.Id,
                IsLike = isUpvote,
                UserId = userId,
                VoteDate = DateTime.Now
            };
            _dbContext.PostVotes.Add(vote);
            _dbContext.Users.Update(postAuthor);
            _dbContext.Posts.Update(post);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> IsPostUpvotedByUser(Guid postId, string userId)
        {
            var vote = await _dbContext.PostVotes.Where(x => x.PostId == postId && x.UserId == userId).FirstOrDefaultAsync();
            return vote != null;
        }

        public async Task<bool> CreatePostAsync(Post post)
        {
            //todo - move the date to front side
            post.Created = DateTime.Now;
            await _dbContext.Posts.AddAsync(post);
            var created = await _dbContext.SaveChangesAsync();
            return created > 0;
        }
        public async Task<bool> DeletePostAsync(Guid postId)
        {
            var post = await GetPostByIdAsync(postId);
            if (post == null)
            {
                return false;
            }
            _dbContext.Posts.Remove(post);
            var deleted = await _dbContext.SaveChangesAsync();
            return deleted > 0;
        }

        public async Task<List<Hashtag>> GetHashtagsAsync()
        {
            return await _dbContext.Hashtags.ToListAsync();
        }

        public async Task<Post> GetPostByIdAsync(Guid postId)
        {
            var post = await _dbContext.Posts
                .Include(post => post.Hashtags)
                .Include(post => post.Comments)
                .SingleOrDefaultAsync(x => x.Id == postId);
            return post;
        }

        public async Task<Post> GetPostByTitleAsync(string title)
        {
            var post = await _dbContext.Posts
                .Include(post => post.Hashtags)
                .Include(post => post.Comments)
                .SingleOrDefaultAsync(x => x.Title == title);
            return post;
        }

        public async Task<List<Post>> GetPostsAsync()
        {
            return await _dbContext.Posts
                .Include(post => post.Hashtags)
                .Include(post => post.Comments)
                .OrderByDescending(x => x.Created)
                .ToListAsync();
        }
        public async Task<List<Post>> GetPostsByHashtagAsync(Hashtag hashtag)
        {
            var posts = await _dbContext.Posts
                .Where(x => x.Hashtags.Select(tag => tag.HashtagNameInLower)
                    .ToList()
                    .Contains(hashtag.HashtagNameInLower))
                .ToListAsync();
            return posts;
        }

        public async Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            _dbContext.Posts.Update(postToUpdate);
            var updated = await _dbContext.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> UserOwnsPostAsync(Guid postId, string userId)
        {
            return await _dbContext.Posts.AsNoTracking().AnyAsync(x => x.Id == postId && x.UserId == userId);
        }

        public async Task<List<Post>> GetPopularPostsThisWeek()
        {
            Dictionary<Guid, int> postsAndLikes = new();
            var postsFromLastWeek = await _dbContext.Posts
                .Where(x => x.Created >= DateTime.Now.AddDays(-7))
                .OrderByDescending(x => x.Score)
                .Take(15)
                .ToListAsync();

            return postsFromLastWeek;
        }

        public async Task<List<Post>> GetUsers5LastPosts(string userId)
        {
             return await _dbContext.Posts
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.Created)
                .Take(5)
                .ToListAsync();
        }

        public async Task<List<Post>> GetTodaysPopularPostsAsync()
        {
            var cutoff = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
            var posts = await _dbContext.PostVotes.Where(x => x.VoteDate <= cutoff).ToListAsync();
            if (posts.Count < 15)
            {
                var postsToReturn = await _dbContext.Posts
                    .OrderByDescending(x => x.Score)
                    .Include(post => post.Hashtags)
                    .Include(post => post.Comments)
                    .ToListAsync();
                return postsToReturn.Take(15).ToList();
            }
            else
            {
                var postsOrdered = posts
                    .GroupBy(x => x.PostId)
                    .Select(g => new
                    {
                        PostId = g.Key,
                        Count = g.Distinct().Count()
                    })
                    .OrderByDescending(x => x.Count)
                    .ToList();
                List<Post> postsToReturn = new();
                foreach (var item in postsOrdered)
                {
                    postsToReturn.Add(_dbContext.Posts.Where(x => x.Id == item.PostId)
                        .Include(post => post.Hashtags)
                        .Include(post => post.Comments)
                        .FirstOrDefault());
                }
                return postsToReturn;
            }
        }

        public async Task<List<Post>> GetNewPosts(int pageSize, int pageNumber)
        {
            var posts = await _dbContext.Posts
                .OrderByDescending(x => x.Created)
                .Take(pageSize)
                .ToListAsync();
            var postsSkipped = posts.Skip((pageNumber - 1) * pageSize).ToList();
            if (postsSkipped.Count > 0)
            {
                return posts.Take(pageSize).ToList();
            }
            return postsSkipped;
        }

        public async Task<List<Post>> GetPostsByPhrase(string phrase, int pageSize, int pageNumber)
        {
            var users = await _dbContext.Posts
            .Where(x => x.Title.ToLower().Contains(phrase.ToLower()) || x.Description.ToLower().Contains(phrase.ToLower()))
            .Include(post => post.Hashtags)
            .Include(post => post.Comments)
            .ToListAsync();

            var usersSkipped = users.Skip((pageNumber - 1) * pageSize).ToList();
            if (usersSkipped.Count > pageSize)
            {
                return users.Take(pageSize).ToList();
            }
            return usersSkipped;
        }

        public async Task<bool> UserAlreadyVotedPost(Guid postId, string userId, bool isUpvote)
        {
            bool userAlreadyLikedPost = await _dbContext.PostVotes
                .Where( x => x.PostId == postId && 
                        x.UserId == userId && 
                        x.IsLike == isUpvote)
                .AnyAsync();
            return userAlreadyLikedPost;
        }

        public async Task<List<Post>> GetUsers5LastLikedPosts(string userId)
        {
            var liked = await _dbContext.PostVotes
                .Where(x=>x.UserId == userId)
                .OrderByDescending(x => x.VoteDate)
                .Take(5)
                .ToListAsync();

            List<Post> posts = new();
            foreach (var item in liked)
            {
                posts.Add(await _dbContext.Posts.Where(x => x.Id == item.PostId).FirstOrDefaultAsync());
            }

            return posts;
        }
    }
}
