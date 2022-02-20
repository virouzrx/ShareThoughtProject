﻿using ShareThoughtProject.Domain;
using System.Threading.Tasks;

namespace ShareThoughtProject.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string username, string password);
        Task<AuthenticationResult> LoginAsync(string email, string username, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}