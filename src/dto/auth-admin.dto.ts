import { z } from 'zod';

export const authAdminDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Please enter your email' })
		.email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(1, {
			message: 'Please enter your password',
		})
		.min(7, {
			message: 'Password must be at least 7 characters long',
		}),
});
