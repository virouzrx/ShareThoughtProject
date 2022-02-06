using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareThoughtProject.Domain
{
    public class Comment
    {
        [Key]
        public Guid Guid { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string AuthorName { get; set; }
        public Guid SupercommentLink { get; set; }
        public int CommentScore { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }
        public string UserId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        public Guid PostId { get; set; }
    }
}
