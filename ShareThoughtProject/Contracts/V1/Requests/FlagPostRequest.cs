using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class FlagPostRequest
    {
        public GeneralFlagReason FlagReason { get; set; }
        public ReportedEntityType ReportedEntityType { get; set; }
        public string Message { get; set; }
    }
}
