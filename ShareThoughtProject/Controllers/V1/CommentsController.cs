using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Services;

namespace ShareThoughtProject.Controllers.V1
{
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public TagsController(IHashtagService hashtagService)
        {
            _hashtagService = hashtagService;
        }

        [HttpGet(ApiRoutes.Hashtags.GetAll)]
        public async Task<IActionResult> GetAllTags()
        {
            return Ok(await _hashtagService.GetAllHashtags());
        }
    }
}
