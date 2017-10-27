using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using NLog;
using NLog.Targets;
using TikaOnDotNet.TextExtraction;
using WordParser.Helpers;
using WordParser.Model;

namespace WordParser
{
    class Program
    {
        private static NLog.Logger logger;
        static void Main(string[] args)
        {

#if DEBUG
            var importFolder = "D:\\WordParserSource";
#else
            var importFolder = args[0];
#endif
            var target = (FileTarget)LogManager.Configuration.FindTargetByName("f");
            target.FileName = Path.Combine(importFolder, $"log_{DateTime.Now.ToString("ddMMyyyyHHmmss")}.log");
            LogManager.ReconfigExistingLoggers();
            logger = NLog.LogManager.GetCurrentClassLogger();
            RunAsync(importFolder).Wait();
        }

        static async Task RunAsync(string importFolder)
        {
            logger.Info("--- START ---");
            var files = Directory.EnumerateFiles(importFolder, "*.*", SearchOption.TopDirectoryOnly)
                .Where(s => s.EndsWith(".docx") || s.EndsWith(".doc")).ToList();
            var successFolder = Path.Combine(importFolder, "success");
            var failFolder = Path.Combine(importFolder, "fail");

            try
            {
                // tạo thư mục nếu thư mục không tồn tại
                if (!Directory.Exists(importFolder))
                {
                    Directory.CreateDirectory(importFolder);
                }
                if (!Directory.Exists(successFolder))
                {
                    Directory.CreateDirectory(successFolder);
                }
                if (!Directory.Exists(failFolder))
                {
                    Directory.CreateDirectory(failFolder);
                }


                var textExtractor = new TextExtractor();
                Console.WriteLine($"There are {files.Count} file(s) found");
                logger.Info($"There are {files.Count} file(s) found");

                var successCount = 0;
                foreach (var file in files)
                {
                    var fileName = Path.GetFileName(file);
                    try
                    {
                        Console.WriteLine($"Extracting file: {file}");
                        logger.Info($"Extracting file: {file}");
                        var text = textExtractor.Extract(file).Text;
                        text = Regex.Replace(text, @"^\s+$[\r\n]*", "", RegexOptions.Multiline);
                        var resultQuestion = new ResultQuestion(fileName, text);
                        var result = await CreateQuestionAsync(resultQuestion);
                        MoveOverwrite(file, Path.Combine(successFolder, fileName));
                        Console.WriteLine($"Extracted file: {file}");
                        logger.Info($"Extracted file: {file}");
                        successCount++;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Extract file ${file} fail with error: {ex.GetBaseException().Message}");
                        MoveOverwrite(file, Path.Combine(failFolder, fileName));
                        logger.Error($"Extract file ${file} fail with error: {ex.GetBaseException().Message}");
                    }
                }
                Console.WriteLine($"{successCount} file(s) were successfully converted");
                logger.Info($"{successCount} file(s) were successfully converted");
                logger.Info("--- END ---");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.GetBaseException().Message);
            }

        }

        static async Task<bool> CreateQuestionAsync(ResultQuestion question)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri(AppSettings.BackendUrl)
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var serializer = new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var jsonQuestion = JObject.FromObject(question, serializer);
            logger.Info($"Call api/Questions with param: {jsonQuestion} ");
            var response = await client.PostAsJsonAsync("api/Questions", jsonQuestion);
            response.EnsureSuccessStatusCode();
            return response.IsSuccessStatusCode;
                
        }

        private static void MoveOverwrite(string sourceFileName, string destFileName)
        {
            if (File.Exists(destFileName))
            {
                File.Delete(destFileName);
            }
            File.Move(sourceFileName, destFileName);
        }
    }
}
