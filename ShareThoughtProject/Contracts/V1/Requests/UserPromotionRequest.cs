using System;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class UserPromotionRequest
    {
        public string Username { get; set; }
        public string Role { get; set; }
    }
}
