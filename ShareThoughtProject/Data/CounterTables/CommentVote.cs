using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareThoughtProjectApi.Domain
{
    public class CommentVote
    {
        [Key]
        public Guid Id { get; set; }
        public bool IsLike { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string UserId { get; set; }
        [ForeignKey("PostId")]
        public Comment Comment { get; set; }
        public Guid CommentId { get; set; }
        public DateTime VoteDate { get; set; }
    }
}