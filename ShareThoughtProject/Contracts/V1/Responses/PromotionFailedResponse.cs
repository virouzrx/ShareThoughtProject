using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ShareThoughtProjectApi.Contracts.V1.Responses
{
    public class PromotionFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
