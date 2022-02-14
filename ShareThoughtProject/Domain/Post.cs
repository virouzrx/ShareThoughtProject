using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Domain
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string UrlTitle { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int Score { get; set; }
        public bool IsDeleted { get; set; }
        public FlagStatus CurrentFlagStatus { get; set; }
        public GeneralFlagReason? FlagReason { get; set; } 
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string UserId{ get; set; }
        public ICollection<Hashtag> Hashtags { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
