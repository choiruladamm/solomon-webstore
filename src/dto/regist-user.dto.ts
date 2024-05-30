import { z } from 'zod';

// Fungsi validasi khusus untuk email
const emailSchema = z
	.string()
	.email({ message: 'Format email salah' })
	.optional();

export const registUserDto = z.object({
	email: emailSchema.or(z.literal('')),
	fullName: z.string().min(3, { message: 'Minimum 3 karakter' }),
	password: z
		.string()
		.min(1, {
			message: 'Kata sandi harus diisi',
		})
		.min(8, {
			message: 'Kata sandi minimal 8 karakter',
		}),
});
