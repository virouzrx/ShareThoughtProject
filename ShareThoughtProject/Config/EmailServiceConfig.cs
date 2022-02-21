namespace ShareThoughtProject.Config
{
    public class EmailServiceConfig : IEmailServiceConfig
    {
        public string Password;
        public EmailServiceConfig(string key)
        {
            Password = key;
        }
        public string GetPassword()
        {
            return Password;
        }
    }
}
