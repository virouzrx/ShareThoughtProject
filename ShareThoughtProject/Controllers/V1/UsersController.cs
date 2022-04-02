﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet(ApiRoutes.User.GetAllUsers)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet(ApiRoutes.User.GetUserInfo)]
        public async Task<IActionResult> GetUserInfo([FromRoute] string username)
        {
            var user = await _userService.GetUserById(username);
            return Ok(user);
        }

        [HttpGet(ApiRoutes.User.SearchUsers)]
        public async Task<IActionResult> GetUsersBySearchedPhrase([FromRoute] string phrase, int pageSize, int pageNumber)
        {
            var user = await _userService.GetUsersByPhrase(phrase, pageSize, pageNumber);
            if (user.Count > 0)
                return Ok(_mapper.Map<List<UserInfoResponse>>(user));
            return NotFound();
        }

    }
}
