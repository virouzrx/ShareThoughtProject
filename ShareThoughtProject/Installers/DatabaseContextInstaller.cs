﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShareThoughtProject.Data;
using ShareThoughtProject.Domain;
using ShareThoughtProject.Interfaces;
using ShareThoughtProject.Services;
using ShareThoughtProject.Services.Classes;
using ShareThoughtProject.Services.Interfaces;

namespace ShareThoughtProject.Installers
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
        }
    }
}
