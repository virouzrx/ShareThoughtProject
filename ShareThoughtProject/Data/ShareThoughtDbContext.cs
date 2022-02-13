using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Domain;

namespace ShareThoughtProject.Data
{
    public class ShareThoughtDbContext : IdentityDbContext
    {
        public ShareThoughtDbContext(DbContextOptions<ShareThoughtDbContext> options)
            : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Hashtag> Hashtags { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; } 
    }
}
