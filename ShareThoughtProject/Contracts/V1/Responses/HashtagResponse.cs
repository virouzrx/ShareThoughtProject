using System;

namespace ShareThoughtProject.Contracts.V1.Responses
{
    public class HashtagResponse
    {
        public Guid Id { get; set; }
        public string HashtagName { get; set; }
        public string HashtagNameInLower { get; set; }
        public int AmountOfHashtagFollowers { get; set; }
    }
}
