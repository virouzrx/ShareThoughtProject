using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static ShareThoughtProjectApi.Domain.Enums;

namespace ShareThoughtProjectApi.Domain
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public string UrlTitle { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int Score { get; set; }
        public bool IsDeleted { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string UserId{ get; set; }
        public ICollection<Hashtag> Hashtags { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
