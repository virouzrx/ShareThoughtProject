using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProject.Interfaces
{
    interface IInstaller
    {
        void InstallServices(IConfiguration configuration, IServiceCollection services);
    }
}
