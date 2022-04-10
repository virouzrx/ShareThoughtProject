using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Domain;
using ShareThoughtProjectApi.Services;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public UserController(IUserService userService, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userService = userService;
            _mapper = mapper;
            _userManager = userManager;
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
            var user = await _userService.GetUserByUsername(username);
            if (user == null)
            {
                return NotFound();
            }
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            var userToReturn = _mapper.Map<UserInfoResponse>(user);
            userToReturn = await _userService.AddUserInfo(userToReturn);
            userToReturn.Role = role;
            return Ok(userToReturn);
        }

        [HttpPost(ApiRoutes.User.SetUserPhoto)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Interoperability", "CA1416:Validate platform compatibility", Justification = "<Pending>")]
        public async Task<IActionResult> SetUserPhoto([FromForm] SetAvatarRequest request)
        {
            string ImageInBase64 = "";

            using (var memoryStream = new MemoryStream())
            {
                await request.Avatar.CopyToAsync(memoryStream);
                using (var bmp = new Bitmap(memoryStream))
                {
                    int size = 300;
                    int scale = 1;
                    if (bmp.Width > size)
                    {
                        scale = bmp.Width / size;
                    }
                    Bitmap resized = new(bmp, new Size(bmp.Width / scale, bmp.Height / scale));
                    using var ms = new MemoryStream();
                    resized.Save(ms, ImageFormat.Jpeg);
                    var byteArray = ms.ToArray();
                    ImageInBase64 = Convert.ToBase64String(byteArray);
                }
            }

            var x = await _userService.SetUserPhoto(ImageInBase64, request.UserId);
            return x ? Ok() : BadRequest();
        }


        [HttpPost(ApiRoutes.User.SetUserDescription)]
        public async Task<IActionResult> SetUserDescription([FromForm] SetDescriptionRequest request)
        {
            var x = await _userService.SetUserDescription(request.Description, request.UserId);
            return x ? Ok() : BadRequest();
        }

        [HttpGet(ApiRoutes.Health.Ping)]
        public async Task<IActionResult> Ping()
        {
            return Ok("pong");
        }

        [HttpGet(ApiRoutes.User.SearchUsers)]
        public async Task<IActionResult> GetUsersBySearchedPhrase([FromRoute] string phrase, int pageSize, int pageNumber)
        {
            var users = await _userService.GetUsersByPhrase(phrase, pageSize, pageNumber);
            List<UserInfoResponse> usersToReturn = new();
            if (users.Count > 0)
            {
                foreach (var item in users)
                {
                    var singleUserInfoResponse = _mapper.Map<UserInfoResponse>(item);
                    var roles = await _userManager.GetRolesAsync(item);
                    singleUserInfoResponse.Role = roles.FirstOrDefault();
                    var adjustedUser = await _userService.AddUserInfo(singleUserInfoResponse);
                    usersToReturn.Add(adjustedUser);

                }
                return Ok(usersToReturn);
            }
            return NotFound();
        }

    }
}
