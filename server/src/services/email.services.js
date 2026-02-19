import 'dotenv/config';

export async function sendEmailVerification(email, rawToken) {
  const url = `${process.env.BACKEND_URL}/auth/verify-email/${rawToken}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('Verification URL:', url);
  }
}
