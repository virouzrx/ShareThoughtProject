﻿using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services.Classes
{
    public class MapHelperService : IMapHelperService
    {
        private readonly IUserService _userService;
        public MapHelperService(IUserService userService)
        {
            _userService = userService;
        }
        public async Task<List<PostResponse>> AddCreatorInfo(List<PostResponse> postResponse)
        {
            foreach (var item in postResponse)
            {
                var author = await _userService.GetUserById(item.UserId);
                item.AuthorName = author.UserName;
                item.AuthorProfilePic = author.AvatarPath;
            }
            return postResponse;
        }
        public async Task<List<CommentResponse>> AddAuthorInfo(List<CommentResponse> commentResponse)
        {
            foreach (var item in commentResponse)
            {
                var user = await _userService.GetUserById(item.UserId);
                item.AuthorAvatar = user.AvatarPath;
                item.AuthorName = user.UserName;
            }
            return commentResponse;
        }
    }
}