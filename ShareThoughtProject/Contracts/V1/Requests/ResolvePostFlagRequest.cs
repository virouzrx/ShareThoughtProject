using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class ResolvePostFlagRequest
    {
        public FlagStatus FlagStatus { get; set; }
    }
}
