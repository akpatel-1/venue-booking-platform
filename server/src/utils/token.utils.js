import crypto from 'crypto';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

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

export function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_SECRET, {
    expiresIn: '30m',
  });
}
