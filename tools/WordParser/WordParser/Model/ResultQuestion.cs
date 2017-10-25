using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WordParser.Model
{
    public class Category
    {
        public string Code { get; set; }
        public string Title { get; set; }
    }

    public class AnswersForAQuestion
    {
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
    }
    public class ResultQuestion
    {
        public int Id { get; set; }
        public string Ref { get; set; }
        public string Description { get; set; }
        public List<AnswersForAQuestion> Answers { get; set; }
        public int DifficultLevel { get; set; }
        public List<Category> Categories { get; set; }
        public bool IsRandom { get; set; }

        public ResultQuestion() { }

        public ResultQuestion(string fileName, string text)
        {
            this.Ref = fileName;
            var split = Regex.Split(text, "##").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            ParseDescription(split.FirstOrDefault(q => q.FirstOrDefault() == '1'));
            ParseAnswers(split.FirstOrDefault(q => q.FirstOrDefault() == '2'));
            ParseRightAnswers(split.FirstOrDefault(q => q.FirstOrDefault() == '3'));
            ParseDifficultLevel(split.FirstOrDefault(q => q.FirstOrDefault() == '4'));
            ParseCategories(split.FirstOrDefault(q => q.FirstOrDefault() == '5'));
            ParseIsRandom(split.FirstOrDefault(q => q.FirstOrDefault() == '6'));
        }

        public void ParseDescription(string text)
        {
            if(string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##1: Missing Question");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##1: Missing Question");
            }
            this.Description = string.Join("\r\n", result.Skip(1));
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
            this.Answers = result.Skip(1).Select(q => new AnswersForAQuestion
            {
                Content = q.Trim()
            }).ToList();
        }

        public void ParseRightAnswers(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##3: Missing Right Answers");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##3: Missing Right Answers");
            }
            foreach (var answersForAQuestion in Answers)
            {
                answersForAQuestion.IsCorrect = result.Skip(1).Select(q => q.Trim()).Contains(answersForAQuestion.Content);
            }
        }

        public void ParseDifficultLevel(string text)
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
            this.DifficultLevel = hardLevel;
        }

        public void ParseCategories(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) throw new Exception("Error ##5: Missing categories");
            var result = Regex.Split(text, "\r\n|\r|\n").Where(q => !string.IsNullOrWhiteSpace(q)).ToList();
            if (result.Count <= 1)
            {
                throw new Exception("Error ##5: Missing categories");
            }
            this.Categories = result.Skip(1).Select(q => new Category
            {
                Code = q.Trim(),
                Title = q.Trim()
            }).ToList();
        }

        public void ParseIsRandom(string text)
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
            this.IsRandom = mix == 1;
        }

     
    }
}
