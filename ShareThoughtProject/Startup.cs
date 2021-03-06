using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ShareThoughtProjectApi.Config;
using ShareThoughtProjectApi.Data;
using ShareThoughtProjectApi.Installers;
using ShareThoughtProjectApi.Options;
using System.IO;
using System.Linq;

namespace ShareThoughtProjectApi
{
    public class Startup
    {
        const string keyPath = "C:\\perspective.txt"; //<- in deployment would be a env var
        const string emailPasswordPath = "C:\\email.txt";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IPerspectiveConfig>(x => new PerspectiveConfig(File.ReadAllText(keyPath)));
            services.AddSingleton<IEmailServiceConfig>(x => new EmailServiceConfig(File.ReadAllText(emailPasswordPath)));
            services.InstallServicesInAssembly(Configuration);
            services.AddAutoMapper(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ShareThoughtDbContext>();
                var autoModerator = context.Users.Where(x => x.UserName == "AutoModerator").FirstOrDefaultAsync();
                if (autoModerator != null)
                {
                    context.Users.Add(new Domain.AppUser
                    {
                        UserName = "AutoModerator",
                        AvatarPath = "todo",
                    });
                }
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            var swaggerOptions = new SwaggerOptions();
            Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(option =>
            {
                option.RouteTemplate = swaggerOptions.JsonRoute;
            });
            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description);
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
