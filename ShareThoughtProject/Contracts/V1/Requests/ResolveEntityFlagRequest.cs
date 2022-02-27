using System;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class ResolveEntityFlagRequest
    {
        public ReportedEntityType ReportedEntityType { get; set; } 
        public Guid FlaggedEntityId { get; set; }
        public FlagStatus FlagStatus { get; set; }
    }
}
