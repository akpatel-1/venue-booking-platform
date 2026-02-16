import crypto from 'crypto';

export function generateEmailVerificationToken() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');
  return hashedToken;
}
