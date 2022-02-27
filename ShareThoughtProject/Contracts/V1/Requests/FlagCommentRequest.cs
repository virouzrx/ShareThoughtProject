using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class FlagCommentRequest
    {
        public GeneralFlagReason CommentFlagReason { get; set; }
        public string Message { get; set; }
    }
}
