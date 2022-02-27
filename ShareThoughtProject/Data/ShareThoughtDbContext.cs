using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data.CounterTables;
using ShareThoughtProjectApi.Domain;

namespace ShareThoughtProjectApi.Data
{
    public class ShareThoughtDbContext : IdentityDbContext<AppUser>
    {
        public ShareThoughtDbContext(DbContextOptions<ShareThoughtDbContext> options)
            : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Hashtag> Hashtags { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PostVote> PostVotes { get; set; }
        public DbSet<CommentVote> CommentsVotes { get; set; }
        public DbSet<HashtagFollow> HashtagFollows { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; } 
        public DbSet<Report> Reports { get; set; }
    }
}
