using ShareThoughtProject.Contracts.V1.Requests;
using ShareThoughtProject.Domain;
using System;
using System.Threading.Tasks;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Services
{
    public interface IFlagService
    {
        Task<FlagEntityResult> FlagEntityAsync(ReportedEntityType reportedEntityType, Guid flaggedEntityId, FlagPostRequest flagPostRequest, string reporterId);

    }
}
