using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareThoughtProjectApi.Domain
{
    public class HashtagFollow
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public string UserId { get; set; }
        [ForeignKey("HashtagId")]
        public Hashtag Hashtag { get; set; }
        public Guid HashtagId { get; set; }
        public DateTime FollowDate { get; set; }
    }
}
