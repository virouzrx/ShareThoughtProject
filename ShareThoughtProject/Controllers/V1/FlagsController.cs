using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Extensions;
using ShareThoughtProjectApi.Services;
using System;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Controllers.V1
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
        //todo - eliminate from routes
        public async Task<IActionResult> FlagEntity([FromRoute] ReportedEntityType entityType, [FromRoute] Guid entityId, [FromBody] FlagPostRequest flagPostRequest)
        {
            var answer = await _flagService.FlagEntityAsync(entityType, entityId, flagPostRequest, HttpContext.GetUserId());
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
