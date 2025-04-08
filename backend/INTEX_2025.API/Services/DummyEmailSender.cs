using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace INTEX_2025.API.Services
{
    public class DummyEmailSender : IEmailSender<IdentityUser>
    {
        public Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink) =>
            Task.CompletedTask;

        public Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink) =>
            Task.CompletedTask;

        public Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode) =>
            Task.CompletedTask;
    }
}
