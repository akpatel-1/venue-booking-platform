import resend from '../../../infrastructure/email/email.js';
import { generateOtpTemplate } from '../../../infrastructure/email/templates/otp.template.js';
import { ApiError } from '../../../utils/api.error.util.js';
import { ERROR_CONFIG } from '../../error.config.js';

export async function processOtpRequestEmail(email, otp) {
  // try {
  //   const response = await resend.emails.send({
  //     from: 'Venuz <onboarding@resend.dev>',
  //     to: email,
  //     subject: 'Your Venuz Verification Code',
  //     html: generateOtpTemplate(otp),
  //   });

  //   return response;
  // } catch (error) {
  //   throw new ApiError(ERROR_CONFIG.EMAIL_SEND_FAILED);
  // }
  console.log(otp);
}
