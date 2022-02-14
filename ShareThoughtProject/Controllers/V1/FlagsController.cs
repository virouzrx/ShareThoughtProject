using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Services;
using System;
using System.Threading.Tasks;

namespace ShareThoughtProject.Controllers.V1
{
    public class FlagsController : ControllerBase
    {
        private readonly IFlagService _flagService;
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;  
        public FlagsController(IFlagService flagService, IPostService postService, ICommentService commentService)
        {
            _flagService = flagService;
            _postService = postService;
            _commentService = commentService;
        }

        [HttpPost(ApiRoutes.Flags.FlagPost)]
        public async Task<IActionResult> FlagPost([FromBody] Guid postId, FlagPostRequest flagPostRequest)
        {
            var post = await _postService.GetPostByIdAsync(postId);
            post.CurrentFlagStatus = Domain.Enums.FlagStatus.FlaggedAndWaiting;
            post.FlagReason = flagPostRequest.FlagReason;
            var flagged = await _flagService.FlagPostAsync(post);
            return (flagged == true ? Ok() : NotFound());
        }

        [HttpPost(ApiRoutes.Flags.FlagComment)]
        public async Task<IActionResult> FlagComment([FromBody] Guid commentId, FlagCommentRequest flagPostRequest)
        {
            var comment = await _commentService.GetCommentByIdAsync(commentId);
            comment.FlagStatus = Domain.Enums.FlagStatus.FlaggedAndWaiting;
            comment.FlagReason = flagPostRequest.CommentFlagReason;
            var flagged = await _flagService.FlagCommentAsync(comment);
            return (flagged == true ? Ok() : NotFound());
        }
    }
}
