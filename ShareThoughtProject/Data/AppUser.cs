using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ShareThoughtProject.Domain
{
    public class AppUser : IdentityUser
    {
        public string AvatarPath { get; set; }
        public string UsernameDisplayName { get; set; }
        public int CommentScore { get; set; }
        public int? PostScore { get; set; }
    }
}
