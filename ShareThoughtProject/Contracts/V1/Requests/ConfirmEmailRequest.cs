namespace ShareThoughtProjectApi.Contracts.V1.Requests
{
    public class ConfirmEmailRequest
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
