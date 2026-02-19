import crypto from 'crypto';

export function generateAuthTokens() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');
  return { rawToken, hashedToken };
}

export function convertToHash(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
