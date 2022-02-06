using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareThoughtProject.Domain
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public int Score { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }
        public string UserId{ get; set; }
        public ICollection<Hashtag> Hashtags { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
