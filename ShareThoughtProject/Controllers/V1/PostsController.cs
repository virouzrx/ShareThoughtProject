﻿using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Domain;
using System;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Contracts.V1.Responses;
using ShareThoughtProject.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ShareThoughtProject.Controllers.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet(ApiRoutes.Posts.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _postService.GetPostsAsync());
        }

        [HttpPut(ApiRoutes.Posts.Update)]
        public async Task<IActionResult> Update([FromRoute] Guid postId, [FromBody] UpdatePostRequest request)
        {
            var post = new Post
            {
                Id = postId,
                Name = request.Name
            };

            var updated = await _postService.UpdatePostAsync(post);
            return (updated == false ? NotFound() : Ok(post));
        }


        [HttpGet(ApiRoutes.Posts.Get)]
        public async Task<IActionResult> Get([FromRoute] Guid postId)
        {
            var post = await _postService.GetPostByIdAsync(postId);
            return (post == null ? NotFound() : Ok(post));
        }

        [HttpDelete(ApiRoutes.Posts.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid postId)
        {
            var deleted = await _postService.DeletePostAsync(postId);
            return (deleted == true ? NoContent() : NotFound());
        }

        [HttpPost(ApiRoutes.Posts.Create)]
        public async Task<IActionResult> Create([FromBody] CreatePostRequest postRequest)
        {
            var post = new Post { Id = Guid.NewGuid(), Name = postRequest.Name };
            if (string.IsNullOrEmpty(post.Name))
            {
                return BadRequest("Name cannot be empty");
            }
            await _postService.CreatePostAsync(post);

            var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}";
            var locationUri = baseUrl + "/" + ApiRoutes.Posts.Get.Replace("{postId}", post.Id.ToString());
            var postResponse = new PostResponse { Id = post.Id };
            return Created(locationUri, post);
        }
    }
}