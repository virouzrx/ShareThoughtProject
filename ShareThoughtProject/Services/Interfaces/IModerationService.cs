using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Data.CounterTables;
using ShareThoughtProjectApi.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Services
{
    public interface IModerationService
    {
        public Task<List<Report>> GetAllFlaggedEntites();
        public Task<List<Report>> GetAllUnresolvedFlaggedEntites();
        public Task<List<Report>> GetAllUnresolvedFlaggedEntitesByType(ReportedEntityType type);
        public Task<List<Report>> GetAllResolvedFlaggedEntitesByUser(string userId);
        public Task<List<Report>> GetAllResolvedFlaggedEntites();
        public Task<FlagResolutionResult> ResolveFlag(ResolveEntityFlagRequest resolveEntityFlagRequest, string resolverId);
        public Task<List<ReporterInfo>> GetReportersInfo();
    }
}
