using Microsoft.AspNetCore.Http;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class SetAvatarRequest
    {
        public string UserId { get; set; }
        public IFormFile Avatar { get; set; }
    }
}
