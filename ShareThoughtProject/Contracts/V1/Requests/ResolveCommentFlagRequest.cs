using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class ResolveCommentFlagRequest
    {
        public FlagStatus FlagStatus { get; set; }
    }
}
