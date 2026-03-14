import crypto from 'crypto';
import 'dotenv/config';

export const userAuthOtp = {
  generateOtp() {
    const otp = crypto.randomInt(100000, 1000000);
    const secret = process.env.OTP_SECRET;
    const hashedOtp = crypto
      .createHmac('sha256', secret)
      .update(otp.toString())
      .digest('hex');

    return { otp, hashedOtp };
  },

  generateOtpHash(otp) {
    const secret = process.env.OTP_SECRET;
    const hashedOtp = crypto
      .createHmac('sha256', secret)
      .update(otp.toString())
      .digest('hex');

    return hashedOtp;
  },
};
