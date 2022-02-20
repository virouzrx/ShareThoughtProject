using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Extensions;
using ShareThoughtProject.Services;
using System;
using System.Threading.Tasks;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Controllers.V1
{
    public class FlagsController : ControllerBase
    {
        private readonly IFlagService _flagService;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService; 
        private readonly IModerationService _moderationService;
        public FlagsController(IFlagService flagService, IPostService postService, ICommentService commentService, IModerationService moderationService)
        {
            _flagService = flagService;
            _postService = postService;
            _commentService = commentService;
            _moderationService = moderationService;
        }

        [HttpPost(ApiRoutes.Flags.FlagEntity)]
        public async Task<IActionResult> FlagEntity([FromRoute] ReportedEntityType reportedEntityType, [FromRoute] Guid flaggedEntityId, [FromBody] FlagPostRequest flagPostRequest)
        {
            var answer = await _flagService.FlagEntityAsync(reportedEntityType, flaggedEntityId, flagPostRequest, HttpContext.GetUserId());
            if (answer.Success)
            {
                return Ok(answer.Message);
            }
            else
            {
                return BadRequest(answer.Message);
            }
        }
    }
}
