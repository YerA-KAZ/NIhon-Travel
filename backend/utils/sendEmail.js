const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a password-reset email containing a secure link.
 * The link includes the raw token; the backend stores only the SHA-256 hash.
 *
 * @param {string} toEmail — recipient email
 * @param {string} resetLink — full URL with token, e.g. http://…/pages/reset-password.html?token=abc123
 */
async function sendResetEmail(toEmail, resetLink) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || '<anything>@kronuerga.resend.app',
    to: toEmail,
    subject: 'Password Reset — Nihon Travel',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:2rem;border:1px solid #eee;border-radius:8px">
        <h2 style="color:#c0392b;margin-bottom:0.5rem">Password Reset</h2>
        <p style="color:#333;line-height:1.7">
          You requested a password reset for your Nihon Travel account.
          Click the button below to set a new password.
          This link expires in <strong>30 minutes</strong>.
        </p>
        <a href="${resetLink}" style="display:inline-block;padding:12px 28px;background:#c0392b;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;margin:1.5rem 0">
          Reset Password
        </a>
        <p style="color:#888;font-size:0.85rem;line-height:1.6">
          If you did not request this, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0">
        <p style="color:#aaa;font-size:0.75rem">Nihon Travel · Japan Travel Guide</p>
      </div>
    `,
  });
}

module.exports = { sendResetEmail };
