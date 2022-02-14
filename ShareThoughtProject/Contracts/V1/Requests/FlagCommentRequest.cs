using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class FlagCommentRequest
    {
        public CommentFlag CommentFlagReason { get; set; }
        public string Message { get; set; }
    }
}
