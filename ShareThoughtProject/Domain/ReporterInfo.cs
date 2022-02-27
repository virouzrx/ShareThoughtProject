namespace ShareThoughtProjectApi.Domain
{
    public class ReporterInfo : AppUser
    {
        public int PostReported { get; set; }
        public int AcceptedPostReports { get; set; }
        public int RejectedPostReports { get; set; }
        public int CommentsReported { get; set; }
        public int AcceptedCommentReports { get; set; }
        public int RejectedCommentReports { get; set; }
    }
}
