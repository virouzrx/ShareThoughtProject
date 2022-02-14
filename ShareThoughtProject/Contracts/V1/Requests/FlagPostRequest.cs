﻿using static ShareThoughtProject.Domain.Enums;

namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class FlagPostRequest
    {
        public GeneralFlagReason FlagReason { get; set; }
        public string Message { get; set; }
    }
}
