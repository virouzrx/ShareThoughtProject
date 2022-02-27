using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Domain;
using ShareThoughtProjectApi.Extensions;
using ShareThoughtProjectApi.Services;
using System;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Controllers.V1
{
    //todo - restrict it with roles
    public class ModeratorFlagController : ControllerBase
    {
        private readonly IFlagService _flagService;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        private readonly IModerationService _moderationService;
        public ModeratorFlagController(IFlagService flagService, IPostService postService, ICommentService commentService, IModerationService moderationService)
        {
            _flagService = flagService;
            _postService = postService;
            _commentService = commentService;
            _moderationService = moderationService;
        }

        [HttpPost(ApiRoutes.Flags.FlagPostResolve)]
        public async Task<IActionResult> ResolveEntityFlag([FromBody] ResolveEntityFlagRequest resolveEntityRequest)
        {
            var resolution = await _moderationService.ResolveFlag(resolveEntityRequest, HttpContext.GetUserId());
            if (resolution.Success && resolution.AnythingChanged)
            {
                return Ok();
            }
            if (resolution.Success && !resolution.AnythingChanged)
            {
                return Ok("No changes have been made. Flagged content hasn't been reviewed");
            }
            return BadRequest("Something went wrong");
        }
    }
}
