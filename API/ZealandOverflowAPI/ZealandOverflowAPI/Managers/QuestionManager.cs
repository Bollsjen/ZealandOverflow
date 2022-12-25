using ZealandOverflowAPI.Models;

namespace ZealandOverflowAPI.Managers
{
    public class QuestionManager
    {
        private UserManager _userManager;
        private List<string> _fulltimeEducations = new List<string>()
        {
            "Administrationsøkonom", "Autoteknolog", "Datamatiker","Finansøkonom", "El-Installatør", "Handelsøkonom", "Markedsføringsøkonom", "Multimediedesigner",
            "Serviceøkonom", "Procesteknolog", "Laborant", "Logistikøkonom", "Jordbrugsteknolog", "Produktionsteknolog", "VVS-Installatør", "Byggetekniker", "IT-teknolog"
        };
        private static int _nextId = 0;
        private static List<Question> _questions = new List<Question>()
        {
            new Question(_nextId++, "økonomen", "Hvordan tjener jeg penge?", 0, "Jeg vil gerne vide lidt mere i detaljer om hvordan jeg kan tjene penge. Jeg kan forstå at jeg kan bruge penge ved at købe ting, men jeg ikke noget at sælge. Hvordan kan jeg så tjene penge?", null, new List<string>(){"Penge", "Salg", "Tjene"}),
            new Question(_nextId++, "datamtikeren1", "Hvordan installerer jeg Visual Studio?", 2, "Jeg kan simpelthen ikke finde ud af Microsofts dokumentation. Jeg får hele tiden fejlen \"Ikke nok disk plads\" når jeg prøver at installere Visual Studio. Hvad skal jeg gøre?", null, new List<string>(){"Visual Studio", "Installation", "Microsoft"}),
            new Question(_nextId++, "laboranten", "Hvordan er det nu jeg titrerer?", 10, "Jeg står som et kæmpe spørgsmåltegn i loboratoriet og kan ikke huske hvad jeg skal bruge til titrering. Please hjælp mig", null, new List<string>(){"Laboratorium", "Laborant", "Titrering"}),
            new Question(_nextId++, "datamatikeren2", "Hvordan får jeg PHP til at hente data fra databaser?", 2, "Jeg har siddet med dette problem længe og kan simpelt hen ikke finde ud af hvordan jeg får PHP til at hente data fra min database. Min database er en MySQL.", null, new List<string>(){"PHP", "SQL", "MySQL"})
        };

        public QuestionManager()
        {
            _userManager = new UserManager();
        }

        public List<Question> GetAllQuestions()
        {
            return _questions;
        }

        public List<Question> GetAllQuestionsByUserId(string userId)
        {
            return _questions.Where(q => q.UserId == userId).ToList();
        }

        public List<Question> GetQuestionsByTags(List<string> tags)
        {
            List<Question> questions = new List<Question>();
            _questions.ForEach(q =>
            {
                q.Tags.ForEach(t =>
                {
                    tags.ForEach(tag =>
                    {
                        if (tag.ToLower() == t.ToLower())
                        {
                            questions.Add(q);
                        }
                    });
                });
            });

            return questions;
        }

        public List<Question> GetQuestionsByEducation(int educationId)
        {
            return _questions.Where(q => q.EducationId == educationId).ToList();
        }

        public Question GetQuestionById(int id)
        {
            return _questions.Where(q => q.Id == id).FirstOrDefault();
        }

        public Question UpdateQuestion(int id, Question question)
        {
            Question questionToUpdate = GetQuestionById(id);
            questionToUpdate.Title = question.Title;
            questionToUpdate.Description = question.Description;
            questionToUpdate.Tags = question.Tags;
            questionToUpdate.EducationId = question.EducationId;
            questionToUpdate.ImageUrls = question.ImageUrls;
            return questionToUpdate;
        }

        public Question CreateQuestion(Question question)
        {
            question.Id = _nextId;
            _questions.Add(question);
            return question;
        }

        public bool DeleteQuestion(int id, User user)
        {
            User checkUser = _userManager.GetUserByUsernameaAndPassword(user.UserName, user.Password);
            Question checkQuestion = GetQuestionById(id);
            if (checkUser != null && checkQuestion.UserId == checkUser.Id)
            {
                _questions.Remove(checkQuestion);
                return true;
            }
            return false;
        }
    }
}
