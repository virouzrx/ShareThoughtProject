using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Domain;

namespace ShareThoughtProject.Data
{
    public class ShareThoughtDbContext : Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext
    {
        public ShareThoughtDbContext(DbContextOptions<ShareThoughtDbContext> options)
            : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; } 
    }
}
