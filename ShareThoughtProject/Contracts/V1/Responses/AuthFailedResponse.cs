using System.Collections.Generic;

namespace ShareThoughtProject.Contracts.V1.Responses
{
    public class AuthFailedResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
