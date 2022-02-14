﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class CreatePostRequest
    {
        public string Name { get; set; }
        public List<string> Hashtags { get; set; }
        public string AuthorName { get; set; }
    }
}
