using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Domain;
using ShareThoughtProject.Extensions;
using ShareThoughtProject.Services;
using System;
using System.Threading.Tasks;

namespace ShareThoughtProject.Controllers.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet(ApiRoutes.Comments.GetAllPostsComments)]
        public async Task<IActionResult> GetPostComments(Guid postId)
        {
            return Ok(await _commentService.GetAllPostCommentsAsync(postId));
        }

        [HttpPost(ApiRoutes.Comments.CreateComment)]
        public async Task<IActionResult> AddComment([FromBody] CreateCommentRequest commentRequest, [FromRoute] Guid postId)
        {
            var comment = new Comment
            {
                Content = commentRequest.Content,
                Created = DateTime.Now,
                CommentScore = 0,
                UserId = HttpContext.GetUserId(),
                PostId = postId
            };

            var created = await _commentService.AddCommentAsync(comment, postId);
            return created == true ? Ok() : NotFound();
        }

        [HttpPost(ApiRoutes.Comments.CreateSubComment)]
        public async Task<IActionResult> AddSubComment([FromBody] CreateCommentRequest commentRequest, [FromRoute] Guid postId, Guid superCommentId)
        {
            var comment = new Comment
            {
                Content = commentRequest.Content,
                Created = DateTime.Now,
                CommentScore = 0,
                UserId = HttpContext.GetUserId(),
                PostId = postId,
                SupercommentLink = superCommentId
            };

            var created = await _commentService.AddCommentAsync(comment, postId);
            return created == true ? Ok() : NotFound();
        }

        [HttpPut(ApiRoutes.Comments.Update)]
        public async Task<IActionResult> EditComment(Guid commentId, [FromBody] UpdateCommentRequest updateCommentRequest)
        {
            var userOwnsPost = await _commentService.UserOwnsCommentAsync(commentId, HttpContext.GetUserId());
            if (!userOwnsPost)
                return BadRequest(new { error = "You don't own this comment" });

            var comment = await _commentService.GetCommentByIdAsync(commentId);

            var updated = await _commentService.EditCommentAsync(comment, updateCommentRequest.Content);
            return (updated == false ? NotFound() : Ok(comment));
        }

        [HttpDelete(ApiRoutes.Comments.Delete)]
        public async Task<IActionResult> DeleteComment(Guid commentId)
        {
            var userOwnsPost = await _commentService.UserOwnsCommentAsync(commentId, HttpContext.GetUserId());
            if (!userOwnsPost)
                return BadRequest(new { error = "You don't own this post" });

            var comment = await _commentService.GetCommentByIdAsync(commentId);
            var deleted = await _commentService.DeleteCommentAsync(comment);
            return deleted == true ? NoContent() : NotFound();
        }

        [HttpPut(ApiRoutes.Comments.Vote)]
        public async Task<IActionResult> VoteComment(Guid commentId, bool isUpvote)
        {
            var comment = await _commentService.GetCommentByIdAsync(commentId);
            var updated = await _commentService.VoteCommentAsync(comment, isUpvote);

            return updated == true ? NoContent() : NotFound();
        }
    }
}
