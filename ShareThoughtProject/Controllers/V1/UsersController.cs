using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Responses;
using ShareThoughtProject.Services;
using System.Threading.Tasks;

namespace ShareThoughtProject.Controllers.V1
{
    public class UsersController
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public class UserController : ControllerBase
        {
            private readonly IUserService _userService;
            private readonly IMapper _mapper;

            public UserController(IUserService userService)
            {
                _userService = userService;
            }

            [HttpGet(ApiRoutes.Posts.GetAll)]
            public async Task<IActionResult> GetAllUsers()
            {
                var users = await _userService.GetAllUsers();
                return Ok(users);
            }

            [HttpGet(ApiRoutes.Posts.GetAll)]
            public async Task<IActionResult> GetUserInfo([FromRoute] string userId)
            {
                var user = _userService.GetUserById(userId);
                var userFollowedHashtags = await _userService.GetHashtagsFollowedByUser(userId);
                var userComments = await _userService.GetCommentsCreatedByUser(userId);
                var userPosts = await _userService.GetPostsCreatedByUser(userId);
                var response = _mapper.Map<UserInfoResponse>(user);
                response.CreatedComments = userComments;
                response.FollowedHashtags = userFollowedHashtags;
                response.CreatedPosts = userPosts;
                return Ok(response);
            }
        }
    }
}
