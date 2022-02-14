using Microsoft.AspNetCore.Identity;

namespace ShareThoughtProject.Domain
{
    public class AppUser : IdentityUser
    {
        public string AvatarPath { get; set; }
        public string UsernameDisplayName { get; set; }
    }
}
