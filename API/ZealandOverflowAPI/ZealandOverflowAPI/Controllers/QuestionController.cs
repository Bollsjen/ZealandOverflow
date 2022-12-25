using Microsoft.AspNetCore.Mvc;
using ZealandOverflowAPI.Managers;
using ZealandOverflowAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ZealandOverflowAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private QuestionManager questionManager;

        public QuestionController()
        {
            questionManager = new QuestionManager();
        }

        // GET: api/<QuestionController>
        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return questionManager.GetAllQuestions();
        }

        // GET api/<QuestionController>/5
        [HttpGet("{id}")]
        public Question Get(int id)
        {
            return questionManager.GetQuestionById(id);
        }

        [HttpGet("{userId}")]
        public IEnumerable<Question> GetQuestionsByUserId(string userId)
        {
            return questionManager.GetAllQuestionsByUserId(userId);
        }

        [HttpGet("{byTags}")]
        public IEnumerable<Question> GetQuestionsByTags(IEnumerable<string> tags)
        {
            return questionManager.GetQuestionsByTags(tags.ToList());
        }

        [HttpGet("{educationId}")]
        public IEnumerable<Question> GetQuestionsByEducation(int educationId)
        {
            return questionManager.GetQuestionsByEducation(educationId);
        }

        // POST api/<QuestionController>
        [HttpPost]
        public Question Post([FromBody] Question question)
        {
            return questionManager.CreateQuestion(question);
        }

        // PUT api/<QuestionController>/5
        [HttpPut("{id}")]
        public Question Put(int id, [FromBody] Question question)
        {
            return questionManager.UpdateQuestion(id, question);
        }

        // DELETE api/<QuestionController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id, User user)
        {
            return questionManager.DeleteQuestion(id, user);
        }
    }
}
