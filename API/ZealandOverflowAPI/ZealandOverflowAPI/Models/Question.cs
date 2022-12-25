namespace ZealandOverflowAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int EducationId { get; set; }
        public List<string> ImageUrls { get; set; }
        public List<string> Tags { get; set; }
        public DateTime? Created { get; set; }

        public Question(int id, string userId, string title, int educationId, string description, List<string> imageUrls, List<string> tags)
        {
            Id = id;
            UserId = userId;
            Title = title;
            Description = description;
            ImageUrls = imageUrls;
            Tags = tags;
            EducationId = educationId;
            Created = DateTime.Now;
        }
    }
}
