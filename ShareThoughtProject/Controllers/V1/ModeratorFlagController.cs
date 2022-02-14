using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Domain;
using ShareThoughtProject.Services;
using System;
using System.Threading.Tasks;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Controllers.V1
{
    //todo - restrict it with roles
    public class ModeratorFlagController : ControllerBase
    {
        private readonly IFlagService _flagService;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        public ModeratorFlagController(IFlagService flagService, IPostService postService, ICommentService commentService)
        {
            _flagService = flagService;
            _postService = postService;
            _commentService = commentService;
        }

        [HttpPost(ApiRoutes.Flags.FlagPostResolve)]
        public async Task<IActionResult> ResolvePostsFlag([FromBody] Guid postId, FlagStatus flagStatus)
        {
            var post = await _postService.GetPostByIdAsync(postId);
            var validationResult = ValidateFlagResolution(flagStatus);
            if (validationResult)
            {
                if (flagStatus == FlagStatus.FlaggedAndDeleted)
                    post.IsDeleted = true;

                post.CurrentFlagStatus = flagStatus;
                var flagged = await _flagService.FlagPostAsync(post);
                return (flagged == true ? Ok() : NotFound());
            }
            return BadRequest("Incorrect flag resolution value.");
        }

        [HttpPost(ApiRoutes.Flags.FlagCommentResolve)]
        public async Task<IActionResult> FlagComment([FromBody] Guid commentId, FlagStatus flagStatus)
        {
            var comment = await _commentService.GetCommentByIdAsync(commentId);
            var validationResult = ValidateFlagResolution(flagStatus);
            if (validationResult)
            {
                if (flagStatus == FlagStatus.FlaggedAndDeleted)
                    comment.IsDeleted = true;

                comment.FlagStatus = flagStatus;
                var flagged = await _flagService.FlagCommentAsync(comment);
                return (flagged == true ? Ok() : NotFound());
            }
            return BadRequest("Incorrect flag resolution value.");
        }

        public bool ValidateFlagResolution(FlagStatus flagStatus)
        {
            if (flagStatus == FlagStatus.NotFlagged || flagStatus == FlagStatus.FlaggedAndWaiting)
                return false;
            return true;
        }
    }
}
