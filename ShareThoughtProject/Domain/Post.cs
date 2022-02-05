using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Domain
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser User { get; set; }
        public string UserId{ get; set; }
        public ICollection<Hashtag> Hashtags { get; set; }
    }
}
