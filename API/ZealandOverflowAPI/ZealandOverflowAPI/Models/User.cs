namespace ZealandOverflowAPI.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }

        public User(string id, string userName, string password)
        {
            Id = id;
            UserName = userName;
            Password = password;
            CreatedDate = DateTime.Now;
        }
    }
}
