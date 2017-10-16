using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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

            var files = Directory.EnumerateFiles(AppSettings.ImportFolder, "*.*", SearchOption.TopDirectoryOnly)
                .Where(s => s.EndsWith(".docx") || s.EndsWith(".doc")).ToList();
            var successFolder = Path.Combine(AppSettings.ImportFolder, "success");
            var failFolder = Path.Combine(AppSettings.ImportFolder, "fail");
            var resultFolder = Path.Combine(AppSettings.ImportFolder, "result");

            try
            {
                // tạo thư mục nếu thư mục không tồn tại
                if (!Directory.Exists(AppSettings.ImportFolder))
                {
                    Directory.CreateDirectory(AppSettings.ImportFolder);
                }
                if (!Directory.Exists(successFolder))
                {
                    Directory.CreateDirectory(successFolder);
                }
                if (!Directory.Exists(failFolder))
                {
                    Directory.CreateDirectory(failFolder);
                }
                if (!Directory.Exists(resultFolder))
                {
                    Directory.CreateDirectory(resultFolder);
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
                        MoveOverwrite(file, Path.Combine(successFolder, fileName));
                        var jsonResult = JsonConvert.SerializeObject(resultQuestion);
                        var jsonPath = Path.Combine(resultFolder, $"{fileName}.json");
                        File.WriteAllText(jsonPath, jsonResult, Encoding.UTF8);
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
           
            Console.ReadLine();
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
