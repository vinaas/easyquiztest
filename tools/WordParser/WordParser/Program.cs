using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TikaOnDotNet.TextExtraction;
using WordParser.Helpers;
using WordParser.Model;

namespace WordParser
{
    class Program
    {
        static void Main(string[] args)
        {
#if DEBUG
            RunAsync("D:\\WordParserSource").Wait();
#else
            RunAsync(args[0]).Wait();
#endif
        }

        static async Task RunAsync(string importFolder)
        {
            var files = Directory.EnumerateFiles(importFolder, "*.*", SearchOption.TopDirectoryOnly)
                .Where(s => s.EndsWith(".docx") || s.EndsWith(".doc")).ToList();
            var successFolder = Path.Combine(importFolder, "success");
            var failFolder = Path.Combine(importFolder, "fail");
            //var resultFolder = Path.Combine(importFolder, "result");

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
                var successCount = 0;
                foreach (var file in files)
                {
                    var fileName = Path.GetFileName(file);
                    try
                    {
                        Console.WriteLine($"Extracting file: {file}");
                        var text = textExtractor.Extract(file).Text;
                        text = Regex.Replace(text, @"^\s+$[\r\n]*", "", RegexOptions.Multiline);
                        var resultQuestion = new ResultQuestion(fileName, text);
                        var result = await CreateQuestionAsync(resultQuestion);
                        MoveOverwrite(file, Path.Combine(successFolder, fileName));
                        //var jsonResult = JsonConvert.SerializeObject(resultQuestion);
                        //var jsonPath = Path.Combine(resultFolder, $"{fileName}.json");
                        //File.WriteAllText(jsonPath, jsonResult, Encoding.UTF8);
                        Console.WriteLine($"Extracted file: {file}");
                        successCount++;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Extract file ${file} fail with error: {ex.GetBaseException().Message}");
                        MoveOverwrite(file, Path.Combine(failFolder, fileName));
                    }
                }
                Console.WriteLine($"{successCount} file(s) were successfully converted");
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

            var response = await client.PostAsJsonAsync("api/Questions", question);
            response.EnsureSuccessStatusCode();
            if (response.IsSuccessStatusCode)
            {
                var returnQuestion = await response.Content.ReadAsAsync<ResultQuestion>();
                foreach (var answersForAQuestion in question.Answers)
                {
                    answersForAQuestion.QuestionId = returnQuestion.id;
                    await client.PostAsJsonAsync($"api/Questions/{returnQuestion.id}/answersForAQuestions",
                        answersForAQuestion);
                }
            }
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
