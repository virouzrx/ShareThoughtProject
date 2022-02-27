using System.Collections.Generic;

namespace ShareThoughtProjectApi.Contracts.V1.Responses
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
