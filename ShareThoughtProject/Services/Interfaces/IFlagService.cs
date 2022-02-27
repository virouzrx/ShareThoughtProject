using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Domain;
using System;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Services
{
    public interface IFlagService
    {
        Task<FlagEntityResult> FlagEntityAsync(ReportedEntityType reportedEntityType, Guid flaggedEntityId, FlagPostRequest flagPostRequest, string reporterId);

    }
}
