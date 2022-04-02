using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Domain;
using ShareThoughtProjectApi.Interfaces;
using ShareThoughtProjectApi.Services;
using ShareThoughtProjectApi.Services.Classes;
using ShareThoughtProjectApi.Services.Interfaces;

namespace ShareThoughtProjectApi.Installers
{
    public class DatabaseContextInstaller : IInstaller
    {
        public void InstallServices(IConfiguration configuration, IServiceCollection services)
        {
            services.AddDbContext<ShareThoughtDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));
            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddDefaultIdentity<AppUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ShareThoughtDbContext>();
            
            //Services
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IHashtagService, HashtagService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IFlagService, FlagService>();
            services.AddScoped<IModerationService, ModerationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IPerspectiveApiService, PerspectiveApiService>();
            services.AddHttpClient<IPerspectiveApiService, PerspectiveApiService>();
            services.AddScoped<IMapHelperService, MapHelperService>();
        }
    }
}
