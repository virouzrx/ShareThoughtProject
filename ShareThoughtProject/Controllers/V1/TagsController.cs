using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareThoughtProject.Contracts;
using ShareThoughtProject.Services;
using System.Threading.Tasks;

namespace ShareThoughtProject.Controllers.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TagsController : ControllerBase
    {
        private readonly IHashtagService _hashtagService;

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
