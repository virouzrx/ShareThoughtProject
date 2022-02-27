using Microsoft.EntityFrameworkCore;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Data.CounterTables;
using ShareThoughtProjectApi.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Services
{
    public class FlagService : IFlagService
    {
        private readonly ShareThoughtDbContext _dbContext;
        public FlagService(ShareThoughtDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<FlagEntityResult> FlagEntityAsync(ReportedEntityType reportedEntityType, Guid flaggedEntityId, FlagPostRequest flagPostRequest, string reporterId)
        {
            if (reportedEntityType == ReportedEntityType.Post)
            {
                var flagged = await _dbContext.Reports
                    .Where(x => x.ReportedEntityType == reportedEntityType &&
                           x.FlagReason == flagPostRequest.FlagReason &&
                           x.ReportedPostId == flaggedEntityId)
                    .FirstOrDefaultAsync();
                if (flagged == null)
                {
                    var report = new Report
                    {
                        ReporterId = reporterId,
                        SameReportsCount = 0,
                        Message = flagPostRequest.Message,
                        ReportedEntityType = reportedEntityType,
                        CurrentFlagStatus = FlagStatus.FlaggedAndWaiting,
                        FlagReason = flagPostRequest.FlagReason,
                        ReportedPostId = flaggedEntityId
                    };
                    _dbContext.Reports.Add(report);
                }
                else if (flagged.IsResolved)
                {
                    return new FlagEntityResult
                    {
                        Success = false,
                        Message = $"This {reportedEntityType} has already been reviewed by moderator"
                    };
                }
                else
                {
                    flagged.SameReportsCount++;
                    _dbContext.Reports.Update(flagged);
                }
                var updated = await _dbContext.SaveChangesAsync();
                string flagMessage;
                if (!(updated > 0))
                {
                    flagMessage = "Something went wrong.";
                }
                else
                {
                    flagMessage = "Flagged successfuly";
                }
                return new FlagEntityResult
                {
                    Success = updated > 0,
                    Message = flagMessage
                };
            }
            else
            {
                var flagged = await _dbContext.Reports
                        .Where(x => x.ReportedEntityType == reportedEntityType &&
                                    x.FlagReason == flagPostRequest.FlagReason &&
                                    x.ReportedCommentId == flaggedEntityId)
                        .FirstOrDefaultAsync();
                if (flagged == null)
                {
                    var report = new Report
                    {
                        ReporterId = reporterId,
                        SameReportsCount = 0,
                        Message = flagPostRequest.Message,
                        ReportedEntityType = reportedEntityType,
                        CurrentFlagStatus = FlagStatus.FlaggedAndWaiting,
                        FlagReason = flagPostRequest.FlagReason,
                        ReportedCommentId = flaggedEntityId
                    };
                    _dbContext.Reports.Add(report);
                }
                else if (flagged.IsResolved)
                {
                    return new FlagEntityResult
                    {
                        Success = false,
                        Message = $"This {reportedEntityType} has already been reviewed by moderator"
                    };
                }
                else
                {
                    flagged.SameReportsCount++;
                }
                _dbContext.Reports.Update(flagged);
                var updated = await _dbContext.SaveChangesAsync();
                string flagMessage;
                if (!(updated > 0))
                {
                    flagMessage = "Something went wrong.";
                }
                else
                {
                    flagMessage = "Flagged successfuly";
                }
                return new FlagEntityResult
                {
                    Success = updated > 0,
                    Message = flagMessage
                };
            }
        }
    }
}
