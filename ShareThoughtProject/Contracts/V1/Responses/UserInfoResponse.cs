using ShareThoughtProject.Domain;
using System;
using System.Collections.Generic;

namespace ShareThoughtProject.Contracts.V1.Responses
{
    public class UserInfoResponse
    {
        public string AvatarPath { get; set; }
        public string UsernameDisplayName { get; set; }
        public int CommentScore { get; set; }
        public DateTime Joined { get; set; }
        public int? PostScore { get; set; }
        public List<Hashtag>? FollowedHashtags { get; set; }
        public List<Post>? CreatedPosts { get; set; }
        public List<Comment>? CreatedComments { get; set; }
    }
}
