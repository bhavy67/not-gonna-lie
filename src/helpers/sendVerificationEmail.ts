import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const result = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Use Resend's test domain or your verified domain
      to: [email],
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    console.log('Email sent successfully:', result);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError: any) {
    console.error('Error sending verification email:', emailError);
    const errorMessage = emailError?.message || 'Failed to send verification email.';
    return { success: false, message: errorMessage };
  }
}
