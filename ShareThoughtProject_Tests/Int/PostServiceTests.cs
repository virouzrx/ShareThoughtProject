using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareThoughtProjectTests.Int
{
    internal class PostServiceTests
    {
        private DbContextOptions<ShareThoughtDbContext> dbContextOptions = new DbContextOptionsBuilder<ShareThoughtDbContext>()
       .UseInMemoryDatabase(databaseName: "PrimeDb")
       .Options;
    }
}
