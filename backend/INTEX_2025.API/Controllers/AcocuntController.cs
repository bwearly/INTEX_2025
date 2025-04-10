using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace INTEX_2025.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AccountController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        // Enable 2FA for the user (only if admin)
        [Authorize(Roles = "Admin")]
        [HttpPost("enable-2fa")]
        public async Task<IActionResult> Enable2FA()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(authenticatorKey))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            var authenticatorUri = GenerateQrCodeUri(user.Email, authenticatorKey);

            return Ok(new { authenticatorUri });
        }

        // Verify 2FA code entered by the user (only if admin)
        [Authorize(Roles = "Admin")]
        [HttpPost("verify-2fa")]
        public async Task<IActionResult> Verify2FA([FromBody] VerifyAuthenticatorCodeViewModel model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, model.Code);

            if (isValid)
            {
                await _userManager.SetTwoFactorEnabledAsync(user, true);
                return Ok(new { message = "Two-factor authentication enabled successfully." });
            }

            return BadRequest("Invalid code.");
        }

        // Helper method to generate the URI for the QR code (Google Authenticator URL)
        private string GenerateQrCodeUri(string email, string key)
        {
            var baseUri = "otpauth://totp/YourAppName:";
            return $"{baseUri}{email}?secret={key}&issuer=YourAppName";
        }

        public class VerifyAuthenticatorCodeViewModel
        {
            public string Code { get; set; }
        }

    }
}
