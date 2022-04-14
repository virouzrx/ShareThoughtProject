using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Extensions;
using ShareThoughtProjectApi.Services;
using ShareThoughtProjectApi.Services.Interfaces;
using System;
using System.Collections.Generic;
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
        private readonly IMapHelperService _mapHelperService;
        private readonly IMapper _mapper;
        public ModeratorController(IFlagService flagService, IPostService postService, ICommentService commentService, 
            IModerationService moderationService, IMapHelperService mapHelperService, IMapper mapper)
        {
            _flagService = flagService;
            _postService = postService;
            _commentService = commentService;
            _moderationService = moderationService;
            _mapHelperService = mapHelperService;
            _mapper = mapper;
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
        public async Task<IActionResult> ResolvePromotionRequest([FromBody] UserPromotionResolveRequest request)
        {
            var created = await _moderationService.ResolvePromotionRequest(request.RequestId, request.Resolution);
            return created ? Ok() : BadRequest();
        }

        [HttpGet(ApiRoutes.Moderation.PromotionRequests)]
        public async Task<IActionResult> GetPromotionRequestsPaginated([FromRoute] int pageSize, int pageNumber, bool resolved)
        {
            var requests = await _moderationService.GetRequestsPaginated(pageSize, pageNumber, resolved);
            if (requests.Count > 0)
            {
                var mapped = _mapper.Map<List<PromotionRequestResponse>>(requests);
                await _mapHelperService.AddRequesterInfo(mapped);
                return Ok(mapped);
            }
            return NotFound();
        }
    }
}
