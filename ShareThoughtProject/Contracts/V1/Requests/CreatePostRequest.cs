using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class CreatePostRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public IFormFile Image { get; set; }
        public string Hashtags { get; set; } //todo - sent list from client side
    }
}
