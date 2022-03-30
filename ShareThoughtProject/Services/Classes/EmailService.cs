using MimeKit;
using MailKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using ShareThoughtProjectApi.Services.Interfaces;
using MimeKit.Text;
using ShareThoughtProjectApi.Config;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using ShareThoughtProjectApi.Contracts;

namespace ShareThoughtProjectApi.Services.Classes
{
    public class EmailService : IEmailService
    {
        private readonly IEmailServiceConfig _emailServiceConfig;

        public EmailService(IEmailServiceConfig emailServiceConfig)
        {
            _emailServiceConfig = emailServiceConfig;
        }

        public async Task<string> Send(string receiver, string token, string userId)
        {
            var message = await CreateHtmlToSend(userId, token);
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("ShareThoughtProject"));
            email.To.Add(MailboxAddress.Parse(receiver));
            email.Subject = "Confirm your email";
            email.Body = new TextPart(TextFormat.Html) { Text = message};

            using var client = new SmtpClient(new ProtocolLogger("smtp.log"));
            
            await client.ConnectAsync("smtp.gmail.com", 465, SecureSocketOptions.SslOnConnect);

            await client.AuthenticateAsync("sharethoughtproject@gmail.com", _emailServiceConfig.GetPassword());

            var response = await client.SendAsync(email);

            await client.DisconnectAsync(true);
            return response;
        }

        private static async Task<string> CreateHtmlToSend(string userId, string token)
        {
            string path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Config\Files\confirmationEmail.html");
            string file = await File.ReadAllTextAsync(path);
            string confirmationLink = $@"https://localhost:3000/activate/{userId}/{token}";
            var message = file.Replace("{TOKEN_LINK}", confirmationLink);
            return message;
        }
    }
}
