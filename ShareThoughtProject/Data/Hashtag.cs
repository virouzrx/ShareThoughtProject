using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Domain
{
    public class Hashtag
    {
        [Key]
        public Guid Id { get; set; }
        public string HashtagName { get; set; }
        public string HashtagNameInLower { get; set; }
        public int AmountOfHashtagFollowers { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
