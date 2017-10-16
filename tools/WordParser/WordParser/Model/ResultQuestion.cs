using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WordParser.Model
{
    public class ResultQuestion
    {
        public string Id { get; set; }
        public string Question { get; set; }
        public List<string> Answers { get; set; }
        public List<string> RightAnswers { get; set; }
        public int HardLevel { get; set; }
        public List<string> Categories { get; set; }
        public int Mix { get; set; }

        public ResultQuestion(string fileName, string text)
        {
            this.Id = fileName;
            var split = Regex.Split(text, "##").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            ParseQuestion(split.FirstOrDefault(q => q.FirstOrDefault() == '1'));
            ParseAnswers(split.FirstOrDefault(q => q.FirstOrDefault() == '2'));
            ParseRightAnswers(split.FirstOrDefault(q => q.FirstOrDefault() == '3'));
            ParseHardLevel(split.FirstOrDefault(q => q.FirstOrDefault() == '4'));
            ParseCategories(split.FirstOrDefault(q => q.FirstOrDefault() == '5'));
            ParseMix(split.FirstOrDefault(q => q.FirstOrDefault() == '6'));
        }

        public void ParseQuestion(string text)
        {
            if(string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##1: Missing Question");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##1: Missing Question");
            }
            this.Question = string.Join("\r\n", result.Skip(1));
        }

        public void ParseAnswers(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##2: Missing Answers");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##2: Missing Answers");
            }
            if (result.Count == 2)
            {
                throw new Exception("Error ##2: Number of answers must be larger than 1");
            }
            this.Answers = result.Skip(1).Select(q=>q.Trim()).ToList();
        }

        public void ParseRightAnswers(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##3: Missing Right Answers");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##3: Missing Right Answers");
            }
            this.RightAnswers = result.Skip(1).Select(q=>q.Trim()).Where(q=>this.Answers.Contains(q)).ToList();
        }

        public void ParseHardLevel(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##4: Missing hard level");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##4: Missing hard level");
            }
            if (!int.TryParse(result.Skip(1).FirstOrDefault(), out var hardLevel))
            {
                throw new Exception("Error ##4: Cannot get hard level");
            }
            this.HardLevel = hardLevel;
        }

        public void ParseCategories(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##5: Missing categories");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##5: Missing categories");
            }
            this.Categories = result.Skip(1).Select(q => q.Trim()).ToList();
        }

        public void ParseMix(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##6: Missing mix");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##6: Missing mix");
            }
            if (!int.TryParse(result.Skip(1).FirstOrDefault(), out var mix))
            {
                throw new Exception("Error ##6: Cannot get hard level");
            }
            if (mix != 0 && mix != 1)
            {
                throw new Exception("Error ##6: Mix must be 1 or 0");
            }
            this.Mix = mix;
        }
    }
}
