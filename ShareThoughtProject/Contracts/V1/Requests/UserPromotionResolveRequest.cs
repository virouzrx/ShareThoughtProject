using System;

namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class UserPromotionResolveRequest
    {
        public Guid RequestId { get; set; }
        public bool Resolution { get; set; }
    }
}
