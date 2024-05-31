import { z } from 'zod';

export const otpDto = z.object({
	otp: z
		.string()
		.min(1, { message: 'Harap isi kode OTP untuk verifikasi' })
		.min(6, {
			message: 'kode OTP minimal 6 number',
		}),
});
