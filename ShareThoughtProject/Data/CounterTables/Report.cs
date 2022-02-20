using ShareThoughtProject.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Data.CounterTables
{
    public class Report
    {
        [Key]
        public Guid ReportId { get; set; }
        public string ReporterId { get; set; }
        public int SameReportsCount { get; set; }
        public string? Message { get; set; }
        public ReportedEntityType ReportedEntityType { get; set; }
        public FlagStatus CurrentFlagStatus { get; set; }
        public GeneralFlagReason? FlagReason { get; set; }
        //nav props
        [ForeignKey("ReporterId")]
        public AppUser Reporter { get; set; }
        public bool IsResolved { get; set; }
        [ForeignKey("ResolverId")]
        public AppUser Resolver { get; set; }
        public string? ResolverId { get; set; }
        [ForeignKey("ReportedPostId")]
        public Post Post { get; set; }
        public Guid? ReportedPostId { get; set; }
        [ForeignKey("ReportedCommentId")]
        public Comment Comment { get; set; }
        public Guid? ReportedCommentId { get; set; }
    }
}
