namespace ShareThoughtProject.Contracts.V1.Requests
{
    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
