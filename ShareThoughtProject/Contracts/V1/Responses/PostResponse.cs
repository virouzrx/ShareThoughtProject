using ShareThoughtProjectApi.Domain;
using System;
using System.Collections.Generic;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Contracts.V1.Responses
{
    public class PostResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string UrlTitle { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string ImagePath { get; set; }
        public int CommentCount { get; set; }
        public string Description { get; set; }
        public int Score { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsUpvoted { get; set; }
        public FlagStatus CurrentFlagStatus { get; set; }
        public GeneralFlagReason? FlagReason { get; set; }
        public string UserId { get; set; } //author
        public string AuthorName { get; set; }
        public string AuthorProfilePic { get; set; }
        public IEnumerable<HashtagResponse> Hashtags { get; set; }
        public IEnumerable<CommentResponse> Comments { get; set; }
    }
}
