using ZealandOverflowAPI.Models;

namespace ZealandOverflowAPI.Managers
{
    public class UserManager
    {
        private static List<User> _users = new List<User>()
        {
            new User(Guid.NewGuid().ToString("N"), "admin", "1234")
        };

        public List<User> GetAllUsers()
        {
            return _users;
        }

        public User GetUserByUsernameaAndPassword(string username, string password)
        {
            return _users.Where(u => u.UserName == username && u.Password == password).FirstOrDefault();
        }
    }
}
