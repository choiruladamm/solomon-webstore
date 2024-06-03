import { z } from 'zod';

export const loginUserDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Email harus diisi' })
		.email({ message: 'Format email salah' }),
	password: z
		.string()
		.min(1, {
			message: 'Kata sandi harus diisi',
		})
		.min(8, {
			message: 'Kata sandi minimal 8 karakter',
		}),
});
