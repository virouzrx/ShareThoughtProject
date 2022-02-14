using System;

namespace ShareThoughtProject.Contracts.V1.Responses
{
    public class CommentResponse
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string AuthorName { get; set; }
        public Guid SupercommentLink { get; set; }
        public int CommentScore { get; set; }
        public string UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
