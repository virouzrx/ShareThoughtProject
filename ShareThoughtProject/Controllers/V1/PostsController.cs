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
using ShareThoughtProjectApi.Services.Interfaces;

namespace ShareThoughtProjectApi.Controllers.V1
{
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IHashtagService _hashtagService;
        private readonly IMapper _mapper;
        private readonly IMapHelperService _mapHelperService;
        public PostsController(IPostService postService, IHashtagService hashtagService, IMapper mapper, IMapHelperService mapHelperService)
        {
            _postService = postService;
            _hashtagService = hashtagService;
            _mapper = mapper;
            _mapHelperService = mapHelperService;
        }

        [HttpGet(ApiRoutes.Posts.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _postService.GetPostsAsync();
            var mappedPosts = _mapper.Map<List<PostResponse>>(posts);
            foreach (var item in mappedPosts)
            {
                item.CommentCount = item.Comments.Count();
            }
            return Ok(mappedPosts);
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
            if (post != null)
            {
                List<PostResponse> tempList = new();
                tempList.Add(_mapper.Map<PostResponse>(post));
                var tempListWithInfo = await _mapHelperService.AddCreatorInfo(tempList);
                tempListWithInfo[0].CommentCount = tempListWithInfo[0].Comments.Count();
                return Ok(tempListWithInfo[0]);
            }
            return NotFound();
        }

        [HttpGet(ApiRoutes.Posts.Search)]
        public async Task<IActionResult> GetPostsByPhrase([FromRoute] string phrase, int pageSize, int pageNumber)
        {
            var post = await _postService.GetPostsByPhrase(phrase, pageSize, pageNumber); 
            if (post.Count > 0)
            {
                var mapped = _mapper.Map<List<PostResponse>>(post);
                foreach (var item in mapped)
                {
                    item.CommentCount = item.Comments.Count();
                }
                return Ok(await _mapHelperService.AddCreatorInfo(mapped));
            }
            return NotFound();
        }

        [HttpDelete(ApiRoutes.Posts.Delete)]
        public async Task<IActionResult> Delete([FromRoute] Guid postId)
        {
            var deleted = await _postService.DeletePostAsync(postId);
            return (deleted == true ? NoContent() : NotFound());
        }

        [HttpPost(ApiRoutes.Posts.Create)]
        public async Task<IActionResult> Create([FromForm] CreatePostRequest postRequest)
        {
            var hashtagsSplit = postRequest.Hashtags
                .Replace(" ", "")
                .Split(',')
                .ToList();
            var hashtags = await _hashtagService.GetTagsByNameAsync(hashtagsSplit);

            if (!hashtags.Any())
            {
                foreach (var tag in hashtagsSplit)
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
            var imgGuid = Guid.NewGuid();
            string ImageInBase64 = "";

            if (postRequest.Image.Length > 0)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    await postRequest.Image.CopyToAsync(ms);
                    var byteArray = ms.ToArray();
                    ImageInBase64 = Convert.ToBase64String(byteArray);
                }
            }
            var post = new Post
            {
                Title = postRequest.Title,
                Description = postRequest.Description,
                UserId = HttpContext.GetUserId(),
                ImagePath = ImageInBase64,
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
        public async Task<IActionResult> VotePost([FromRoute] Guid postId, string userId, bool isUpvote)
        {

            if (await _postService.UserOwnsPostAsync(postId, userId))
            {
                return BadRequest("You can't vote your own post.");
            }

            var post = await _postService.GetPostByIdAsync(postId);
            var updated = await _postService.VotePostAsync(post, isUpvote, userId);

            return updated == true ? NoContent() : NotFound();
        }

        [HttpGet(ApiRoutes.Posts.PopularToday)]
        public async Task<IActionResult> GetPopularPostsToday()
        {
            var objects = await _postService.GetTodaysPopularPostsAsync();
            var mapped = _mapper.Map<List<PostResponse>>(objects);
            foreach (var item in mapped)
            {
                item.CommentCount = item.Comments.Count();
            }
            await _mapHelperService.AddCreatorInfo(mapped);
            return Ok(mapped);
        }

        [HttpGet(ApiRoutes.Posts.TopThisWeek)]
        public async Task<IActionResult> GetTopPostsThisWeek()
        {
            var objects = await _postService.GetPopularPostsThisWeek();
            var mapped = _mapper.Map<List<PostResponse>>(objects);
            foreach (var item in mapped)
            {
                item.CommentCount = item.Comments.Count();
            }
            await _mapHelperService.AddCreatorInfo(mapped);
            return Ok(mapped);
        }

        [HttpGet(ApiRoutes.Posts.New)]
        public async Task<IActionResult> GetNewPosts([FromRoute] int pageSize, int pageNumber)
        {
            var objects = await _postService.GetNewPosts(pageSize, pageNumber);
            var mapped = _mapper.Map<List<PostResponse>>(objects);
            foreach (var item in mapped)
            {
                item.CommentCount = item.Comments.Count();
            }
            return Ok(mapped);
        }
    }
}
