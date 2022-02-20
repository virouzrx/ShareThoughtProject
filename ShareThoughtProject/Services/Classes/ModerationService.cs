﻿using ShareThoughtProject.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using ShareThoughtProject.Domain;
using Microsoft.EntityFrameworkCore;
using ShareThoughtProject.Data.CounterTables;
using ShareThoughtProject.Contracts.V1.Requests;
using System;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Services.Classes
{
    public class ModerationService : IModerationService
    {
        private readonly ShareThoughtDbContext _context;
        public ModerationService(ShareThoughtDbContext context)
        {
            _context = context;
        }

        public async Task<List<Report>> GetAllFlaggedEntites()
        {
            return await _context.Reports.ToListAsync();
        }

        public async Task<List<Report>> GetAllUnresolvedFlaggedEntites()
        {
            return await _context.Reports.Where(x => !x.IsResolved).ToListAsync();
        }

        public async Task<List<Report>> GetAllResolvedFlaggedEntitesByUser(string userId)
        {
            return await _context.Reports.Where(x => x.IsResolved && x.ResolverId == userId).ToListAsync();
        }

        public async Task<List<ReporterInfo>> GetReportersInfo()
        {
            List<ReporterInfo> reporterInfos = new();
            var reports = await _context.Reports.ToListAsync();
            var reporters = reports.Select(x => x.ReporterId).ToList();
            foreach (var item in reporters)
            {
                var allReporterPostsReported = reports.Where(x => x.ReporterId == item && x.ReportedEntityType == Enums.ReportedEntityType.Post).ToList();
                var allReporterCommentsReported = reports.Where(x => x.ReporterId == item && x.ReportedEntityType == Enums.ReportedEntityType.Comment).ToList();
                reporterInfos.Add(new ReporterInfo
                {
                    PostReported = allReporterPostsReported.Count(),
                    AcceptedPostReports = allReporterPostsReported.Where(x => x.CurrentFlagStatus == Enums.FlagStatus.FlaggedAndDeleted).Count(),
                    RejectedPostReports = allReporterPostsReported.Where(x => x.CurrentFlagStatus == Enums.FlagStatus.FlaggedAndLeft).Count(),
                    CommentsReported = allReporterCommentsReported.Count(),
                    AcceptedCommentReports = allReporterCommentsReported.Where(x => x.CurrentFlagStatus == Enums.FlagStatus.FlaggedAndDeleted).Count(),
                    RejectedCommentReports = allReporterCommentsReported.Where(x => x.CurrentFlagStatus == Enums.FlagStatus.FlaggedAndLeft).Count()
                });
            }
            return reporterInfos;
        }

        public async Task<List<Report>> GetAllUnresolvedFlaggedEntitesByType(Enums.ReportedEntityType type)
        {
            return await _context.Reports.Where(x => !x.IsResolved && x.ReportedEntityType == type).ToListAsync(); 
        }

        public async Task<List<Report>> GetAllResolvedFlaggedEntites()
        {
            return await _context.Reports.Where(x => x.IsResolved).ToListAsync();
        }

        public async Task<FlagResolutionResult> ResolveFlag(ResolveEntityFlagRequest resolveEntityFlagRequest, string resolverId)
        {
            //get report with correct entity type, with correct id, which is unresolved
            Report report = null;
            if (resolveEntityFlagRequest.ReportedEntityType == Enums.ReportedEntityType.Comment)
            {
                report = await _context.Reports
                    .Where( x => x.ReportedCommentId == resolveEntityFlagRequest.FlaggedEntityId &&
                            x.IsResolved == false).FirstOrDefaultAsync();
            }
            else
            {
                report = await _context.Reports
                    .Where(x => x.ReportedPostId == resolveEntityFlagRequest.FlaggedEntityId &&
                           x.IsResolved == false).FirstOrDefaultAsync();
            }
            //if deleted, mark entity as deleted and update db
            report.ResolverId = resolverId;
            if (resolveEntityFlagRequest.FlagStatus == Enums.FlagStatus.FlaggedAndDeleted)
            {
                report.IsResolved = true;
                if (resolveEntityFlagRequest.ReportedEntityType == Enums.ReportedEntityType.Comment)
                {
                    var comment =  await _context.Comments.Where(x => x.Id == resolveEntityFlagRequest.FlaggedEntityId).FirstOrDefaultAsync();
                    comment.IsDeleted = true;
                    _context.Comments.Update(comment);
                    
                }
                else
                {
                    var post = await _context.Posts.Where(x => x.Id == resolveEntityFlagRequest.FlaggedEntityId).FirstOrDefaultAsync();
                    post.IsDeleted = true;
                    _context.Posts.Update(post);
                }
                report.CurrentFlagStatus = FlagStatus.FlaggedAndDeleted;
                _context.Reports.Update(report);
                var updated = await _context.SaveChangesAsync();
                return new FlagResolutionResult
                {
                    AnythingChanged = updated > 0,
                    Success = true
                };
            }
            else if (resolveEntityFlagRequest.FlagStatus == FlagStatus.FlaggedAndLeft)
            {
                report.IsResolved = true;
                report.CurrentFlagStatus = FlagStatus.FlaggedAndLeft;
                _context.Reports.Update(report);
                var updated = await _context.SaveChangesAsync();
                return new FlagResolutionResult
                {
                    AnythingChanged = updated > 0,
                    Success = true
                };
            }
            //nothing changed and something went wrong
            else
            {
                return new FlagResolutionResult
                {
                    AnythingChanged = false,
                    Success = false
                };
            }
           
        }
    }
}
