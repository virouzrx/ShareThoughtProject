using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services
{
    public class UserService : IUserService
    {
        private readonly ShareThoughtDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public UserService(ShareThoughtDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<List<AppUser>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsCreatedByUser(string userId)
        {
            return await _context.Comments.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<List<Hashtag>> GetHashtagsFollowedByUser(string userId)
        {
            var hashtagIds = await _context.HashtagFollows
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();
            List<Hashtag> hashtags = new();
            foreach (var item in hashtagIds)
            {
                hashtags.Add(await _context.Hashtags.Where(x => x.Id == item).FirstOrDefaultAsync());
            }
            return hashtags;
        }

        public async Task<List<Post>> GetPostsCreatedByUser(string userId)
        {
            var posts = await _context.Posts.Where(x => x.UserId == userId).ToListAsync();
            return posts;
        }

        public async Task<AppUser> GetUserById(string userId)
        {
            return await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<List<AppUser>> GetUsersByPhrase(string phrase, int pageSize, int pageNumber)
        {
            var users = await _context.Users
                .Where(x => x.UserName
                    .ToLower()
                    .Contains(phrase.ToLower()))
                .ToListAsync();

            var usersSkipped = users.Skip((pageNumber - 1) * pageSize).ToList();
            if (usersSkipped.Count > pageSize)
            {
                return usersSkipped.Take(pageSize).ToList();
            }
            return usersSkipped;
        }

        public async Task<AppUser> GetUserByUsername(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
        }

        public async Task<UserInfoResponse> AddUserInfo(UserInfoResponse response)
        {
            var user = await _context.Users.Where(x => x.UserName == response.UserName).FirstOrDefaultAsync();
            var userPosts = (await _context.Posts.Where(x => x.UserId == user.Id).ToListAsync()).Count;
            var userComments = (await _context.Comments.Where(x => x.UserId == user.Id).ToListAsync()).Count;
            response.PostScore = await _context.Posts.Where(x => x.UserId == user.Id).SumAsync(x => x.Score);
            response.CommentAmount = userComments;
            response.PostAmount = userPosts;
            return response;
        }

        public async Task<bool> SetUserPhoto(IFormFile file, string userId)
        {
            var imageInBase64 = await ConvertImageToBase64String(file);
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            user.AvatarPath = imageInBase64;
            _context.Users.Update(user);
            var updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> SetUserDescription(string description, string userId)
        {
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            user.Description = description;
            _context.Users.Update(user);
            var updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<List<AppUser>> GetUsersPaginated(int pageSize, int pageNumber)
        {
            var creators = (await _userManager.GetUsersInRoleAsync("Creator")).ToList();
            var creatorsSkipped = creators.Skip((pageNumber - 1) * pageSize).ToList();
            if (creatorsSkipped.Count > pageSize)
            {
                return creatorsSkipped.Take(pageSize).ToList();
            }
            return creatorsSkipped;
        }

        //to unit test
        private async static Task<string> ConvertImageToBase64String(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            using var bmp = new Bitmap(memoryStream);
            int size = 300;
            int scale = 1;
            if (bmp.Width > size)
            {
                scale = bmp.Width / size;
            }
            using Bitmap resized = new(bmp, new Size(bmp.Width / scale, bmp.Height / scale));
            using var ms = new MemoryStream();
            resized.Save(ms, ImageFormat.Jpeg);
            var byteArray = ms.ToArray();
            string imageInBase64 = Convert.ToBase64String(byteArray);
            return imageInBase64;
        }
    }
}
