using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class ResolvePostFlagRequest
    {
        public FlagStatus FlagStatus { get; set; }
    }
}
