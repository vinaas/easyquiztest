using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordParser.Helpers
{
    public static class AppSettings
    {
        public static string ImportFolder => ConfigurationManager.AppSettings["ImportFolder"];
    }
}
