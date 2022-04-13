using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Extensions;
using ShareThoughtProjectApi.Services;
using System;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Moderator, Admin")]
    public class ModeratorController : ControllerBase
    {
        private readonly IFlagService _flagService;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        private readonly IModerationService _moderationService;
        public ModeratorController(IFlagService flagService, IPostService postService, ICommentService commentService, IModerationService moderationService)
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

        [HttpPost(ApiRoutes.Moderation.RequestPromotion)]
        public async Task<IActionResult> RequestPromotion([FromBody] UserPromotionAppealRequest promotionRequest)
        {
            var created = await _moderationService.CreatePromotionRequest(promotionRequest.UserId, promotionRequest.Description);
            return Ok(created);
        }

        [HttpPost(ApiRoutes.Moderation.ResolvePromotionRequest)]
        public async Task<IActionResult> ResolvePromotionRequest([FromRoute] Guid requestId, bool status)
        {
            var created = await _moderationService.ResolvePromotionRequest(requestId, status);
            return created ? Ok() : BadRequest();
        }
    }
}
