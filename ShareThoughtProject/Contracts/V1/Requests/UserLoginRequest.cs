namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class UserLoginRequest
    {
        public string Credential { get; set; }
        public string Password { get; set; }
    }
}
