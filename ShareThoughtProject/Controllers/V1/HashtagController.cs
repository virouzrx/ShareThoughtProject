using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Services;
using System;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HashtagController : ControllerBase
    {
        private readonly IHashtagService _hashtagService;

        public HashtagController(IHashtagService hashtagService)
        {
            _hashtagService = hashtagService;
        }

        [HttpGet(ApiRoutes.Hashtags.GetAll)]
        public async Task<IActionResult> GetAllTags()
        {
            return Ok(await _hashtagService.GetAllHashtags());
        }

        [HttpPost(ApiRoutes.Hashtags.Follow)]
        public async Task<IActionResult> FollowHashtag(Guid hashtagId)
        {
            return Ok(await _hashtagService.GetAllHashtags());
        }
    }
}
