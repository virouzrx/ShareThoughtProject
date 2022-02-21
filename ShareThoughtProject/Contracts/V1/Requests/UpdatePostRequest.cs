using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class UpdatePostRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string UrlTitle { get; set; } //todo - replace it with some generator?
        public string Content { get; set; }
        public List<string> Hashtags { get; set; }
    }
}
