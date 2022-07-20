using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;

namespace ShareThoughtProjectTests.Int
{
    internal class DatabaseContextHelper
    {
        private readonly DbContextOptions<ShareThoughtDbContext> dbContextOptions = new DbContextOptionsBuilder<ShareThoughtDbContext>()
                .UseInMemoryDatabase(databaseName: "PrimeDb")
                .Options;

        internal ShareThoughtDbContext GetContext()
        {            
            return new ShareThoughtDbContext(dbContextOptions);
        }

        internal void PopulateDb()
        {
            var context = GetContext();
            List<Post> posts = new()
            {
                new Post { Id = Guid.NewGuid(), Title = "Title1", ImagePath = "iVBOR", Description = "Desc1", Created = DateTime.Now, Score = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString() },
                new Post { Id = Guid.NewGuid(), Title = "Title2", ImagePath = "iVBOR", Description = "Desc2", Created = DateTime.Now, Score = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString() },
                new Post { Id = Guid.NewGuid(), Title = "Title3", ImagePath = "iVBOR", Description = "Desc3", Created = DateTime.Now, Score = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString() },
            };

            List<Comment> comments = new()
            {
                new Comment { Id = Guid.NewGuid(), Content = "Content1", Created = DateTime.Now, CommentScore = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString(), PostId = posts[0].Id },
                new Comment { Id = Guid.NewGuid(), Content = "Content2", Created = DateTime.Now, CommentScore = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString(), PostId = posts[1].Id },
                new Comment { Id = Guid.NewGuid(), Content = "Content3", Created = DateTime.Now, CommentScore = 0, IsDeleted = false, UserId = Guid.NewGuid().ToString(), PostId = posts[2].Id },
            };

            List<AppUser> users = new()
            {

            };
        }
    }
}
