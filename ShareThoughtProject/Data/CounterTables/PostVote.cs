using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareThoughtProject.Domain
{
    public class PostVote
    {
        [Key]
        public Guid Id { get; set; }
        public bool IsLike { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string UserId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        public Guid PostId { get; set; }
        public DateTime VoteDate { get; set; }
    }
}