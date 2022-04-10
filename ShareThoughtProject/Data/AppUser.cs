using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ShareThoughtProjectApi.Domain
{
    public class AppUser : IdentityUser
    {
        public string AvatarPath { get; set; }
        public int CommentScore { get; set; }
        public DateTime Joined { get; set; }
        public int? PostScore { get; set; }
        public string Description { get; set; }
    }
}
