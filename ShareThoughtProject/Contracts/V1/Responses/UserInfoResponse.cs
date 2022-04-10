using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;

namespace ShareThoughtProjectApi.Contracts.V1.Responses
{
    public class UserInfoResponse
    {
        public string AvatarPath { get; set; }
        public string UsernameDisplayName { get; set; }
        public string Description { get; set; }
        public int CommentAmount { get; set; }
        public string UserName { get; set; }
        public int PostAmount { get; set; }
        public DateTime Joined { get; set; }
        public int? PostScore { get; set; }
        public List<Hashtag>? FollowedHashtags { get; set; }
        public string Role { get; set; }
    }
}
