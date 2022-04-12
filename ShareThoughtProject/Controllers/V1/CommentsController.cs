using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Domain;
using ShareThoughtProjectApi.Extensions;
using ShareThoughtProjectApi.Services;
using ShareThoughtProjectApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Controllers.V1
{
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IPerspectiveApiService _perspectiveApiService;
        private readonly IMapper _mapper;
        private readonly IMapHelperService _mapHelperService;

        public CommentsController(ICommentService commentService, IPerspectiveApiService perspectiveApiService, 
            IMapper mapper, IMapHelperService mapHelperService)
        {
            _commentService = commentService;
            _perspectiveApiService = perspectiveApiService;
            _mapper = mapper;
            _mapHelperService = mapHelperService;
        }

        [HttpGet(ApiRoutes.Comments.GetAllPostsComments)]
        public async Task<IActionResult> GetPostComments(Guid postId)
        {
            var comments = _mapper.Map<List<CommentResponse>>(await _commentService.GetAllPostCommentsAsync(postId));
            await _mapHelperService.AddAuthorInfo(comments);
            return Ok(comments);
        }

        [HttpGet(ApiRoutes.Comments.GetAllPostsCommentsPaginated)]
        public async Task<IActionResult> GetPostCommentsPaginated(Guid postId, int pageSize, int pageNumber)
        {
            var comments = _mapper.Map<List<CommentResponse>>(await _commentService.GetAllPostCommentsPaginatedAsync(postId, pageSize, pageNumber));
            if (comments.Count > 0)
            {
                await _mapHelperService.AddAuthorInfo(comments);
                return Ok(comments);
            }
            return NotFound();
        }



        [HttpPost(ApiRoutes.Comments.CreateComment)]
        public async Task<IActionResult> AddComment([FromBody] CreateCommentRequest commentRequest, [FromRoute] Guid postId)
        {
            var comment = new Comment
            {
                Content = commentRequest.Content,
                Created = DateTime.Now,
                CommentScore = 0,
                UserId = commentRequest.UserId,
                PostId = postId
            };
            var autoModerationResult = await _perspectiveApiService.AutoModerateComment(commentRequest.Content);
            if (autoModerationResult == AutoModerationResult.AutoModerationStatus.REJECT)
            {
                return BadRequest("We have detected a violent content in your comment. Please change the content of your comment.");
            }
            if (autoModerationResult == AutoModerationResult.AutoModerationStatus.FLAG)
            {
                
            }

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
            var userId = HttpContext.GetUserId();
            var comment = await _commentService.GetCommentByIdAsync(commentId);
            var updated = await _commentService.VoteCommentAsync(comment, isUpvote, userId);

            return updated == true ? NoContent() : NotFound();
        }
    }
}
