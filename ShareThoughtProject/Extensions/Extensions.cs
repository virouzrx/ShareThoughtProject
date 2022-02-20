using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ShareThoughtProject.Data;
using System.Linq;

namespace ShareThoughtProject.Extensions
{
    public static class Extensions
    {
        public static string GetUserId(this HttpContext httpContext)
        {
            if (httpContext.User == null)
            {
                return string.Empty;
            }
            return httpContext.User.Claims.Single(x => x.Type == "id").Value;
        }

        public static string GetUsername(this HttpContext httpContext)
        {
            if (httpContext.User == null)
            {
                return string.Empty;
            }
            return httpContext.User.Claims.Single(x => x.Type == "username").Value;
        }
    }
}
