using Microsoft.AspNetCore.Mvc;
using ShareThoughtProjectApi.Domain;
using System;
using ShareThoughtProjectApi.Contracts;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using ShareThoughtProjectApi.Extensions;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;
using System.IO;

namespace ShareThoughtProjectApi.Controllers.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Creator, Moderator")]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IHashtagService _hashtagService;
        private readonly IMapper _mapper;
        public PostsController(IPostService postService, IHashtagService hashtagService, IMapper mapper)
        {
            _postService = postService;
            _hashtagService = hashtagService;
            _mapper = mapper;
        }

        [HttpGet(ApiRoutes.Posts.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _postService.GetPostsAsync();
            return Ok(_mapper.Map<List<PostResponse>>(posts));
        }

        [HttpPut(ApiRoutes.Posts.Update)]
        public async Task<IActionResult> Update([FromRoute] Guid postId, [FromBody] UpdatePostRequest request)
        {
            var userOwnsPost = await _postService.UserOwnsPostAsync(postId, HttpContext.GetUserId());
            if (!userOwnsPost)
                return BadRequest(new { error = "You don't own this post" });
            var hashtags = await _hashtagService.GetTagsByNameAsync(request.Hashtags);
            if (!hashtags.Any())
            {
                foreach (var tag in request.Hashtags)
                {
                    var hashtag = new Hashtag
                    {
                        HashtagName = tag,
                        HashtagNameInLower = tag.ToLower(),
                        AmountOfHashtagFollowers = 0
                    };
                    hashtags.Add(hashtag);
                }
            }
            var post = await _postService.GetPostByIdAsync(postId);

            post.Title = request.Title;
            post.Description = request.Description;
            post.UrlTitle = request.UrlTitle;
            post.UserId = HttpContext.GetUserId();
            post.Hashtags = hashtags;

            if (string.IsNullOrEmpty(post.Title))
            {
                return BadRequest("Title cannot be empty");
            }
            if (string.IsNullOrEmpty(post.Description))
            {
                return BadRequest("Description cannot be empty");
            }
            if (string.IsNullOrEmpty(post.Content))
            {
                return BadRequest("Content cannot be empty");
            }

            var updated = await _postService.UpdatePostAsync(post);
            return (updated == false ? NotFound() : Ok(_mapper.Map<PostResponse>(post)));
        }


        [HttpGet(ApiRoutes.Posts.Get)]
        public async Task<IActionResult> Get([FromRoute] Guid postId)
        {
            var post = await _postService.GetPostByIdAsync(postId);
            return (post == null ? NotFound() : Ok(_mapper.Map<PostResponse>(post)));
        }

        [HttpDelete(ApiRoutes.Posts.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid postId)
        {
            var userOwnsPost = await _postService.UserOwnsPostAsync(postId, HttpContext.GetUserId());
            if (!userOwnsPost)
                return BadRequest(new { error = "You don't own this post" });

            var deleted = await _postService.DeletePostAsync(postId);
            return (deleted == true ? NoContent() : NotFound());
        }

        [HttpPost(ApiRoutes.Posts.Create)]
        public async Task<IActionResult> Create([FromForm] CreatePostRequest postRequest)
        {
            var hashtags = await _hashtagService.GetTagsByNameAsync(postRequest.Hashtags);
            if (!hashtags.Any())
            {
                foreach (var tag in postRequest.Hashtags)
                {
                    var hashtag = new Hashtag
                    {
                        HashtagName = tag,
                        HashtagNameInLower = tag.ToLower(),
                        AmountOfHashtagFollowers = 0
                    };
                    hashtags.Add(hashtag);
                }
            }
            string filePath = Path.Combine(@"C:\stp\post_images", postRequest.Image.FileName);
            if (postRequest.Image.Length > 0)
            {
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await postRequest.Image.CopyToAsync(fileStream);
                }
            }
            var post = new Post
            {
                Title = postRequest.Title,
                Description = postRequest.Description,
                UserId = HttpContext.GetUserId(),
                ImagePath = filePath,
                Created = DateTime.Now,
                Content = postRequest.Content,
                Score = 0,
                Hashtags = hashtags
            };
            if (string.IsNullOrEmpty(post.Title))
            {
                return BadRequest("Title cannot be empty");
            }
            if (string.IsNullOrEmpty(post.Description))
            {
                return BadRequest("Description cannot be empty");
            }
            if (string.IsNullOrEmpty(post.Content))
            {
                return BadRequest("Content cannot be empty");
            }
            await _postService.CreatePostAsync(post);

            var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}";
            var locationUri = baseUrl + "/" + ApiRoutes.Posts.Get.Replace("{postId}", post.Id.ToString());
            return Created(locationUri, _mapper.Map<PostResponse>(post));

        }

        [HttpPut(ApiRoutes.Posts.Vote)]
        public async Task<IActionResult> VoteComment(Guid commentId, bool isUpvote)
        {
            var userId = HttpContext.GetUserId();
            var comment = await _postService.GetPostByIdAsync(commentId);
            var updated = await _postService.VotePostAsync(comment, isUpvote, userId);

            return updated == true ? NoContent() : NotFound();
        }
    }
}
