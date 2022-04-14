using System;

namespace ShareThoughtProjectApi.Contracts.V1.Responses
{
    public class PromotionRequestResponse
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public DateTime RequestCreationDate { get; set; }
        public string UserAvatar { get; set; }
        public string PromotionRequestContent { get; set; }
    }
}
