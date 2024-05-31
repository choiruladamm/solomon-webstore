import { z } from 'zod';

export const sendOtpDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Email harus diisi' })
		.email({ message: 'Format email salah' }),
});
