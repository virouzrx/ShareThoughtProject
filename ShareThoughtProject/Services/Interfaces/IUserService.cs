﻿using ShareThoughtProject.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProject.Services
{
    public interface IUserService
    {
        public Task<AppUser> GetUserById(string userId);
        public Task<List<AppUser>> GetAllUsers();
        public Task<List<Hashtag>> GetHashtagsFollowedByUser(string userId);
        public Task<List<Comment>> GetCommentsCreatedByUser(string userId);
        public Task<List<Post>> GetPostsCreatedByUser(string userId);
    }
}
