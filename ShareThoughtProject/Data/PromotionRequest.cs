using System;
using System.ComponentModel.DataAnnotations;

namespace ShareThoughtProjectApi.Data
{
    public class PromotionRequest
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public DateTime RequestCreationDate { get; set; }
        public string PromotionRequestContent { get; set; }
        public bool? RequestStatus { get; set; }
    }
}
