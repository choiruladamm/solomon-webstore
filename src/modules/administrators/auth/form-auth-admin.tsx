'use client';

import { PasswordInput } from '@/components/custom-ui/password-input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authAdminDto } from '@/dto/auth-admin.dto';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormAuthAdminProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormAuthAdmin: FC<FormAuthAdminProps> = ({ className, ...props }) => {
	const [isPending, setIsPending] = React.useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof authAdminDto>>({
		mode: 'onChange',
		resolver: zodResolver(authAdminDto),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof authAdminDto>) => {
		// setIsPending(true);
		// await new Promise(resolve => setTimeout(resolve, 1000));
		// const data = {
		// 	email: values.email,
		// 	password: values.password,
		// };
		// try {
		// 	const response = await axios.post(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
		// 		data,
		// 	);
		// 	if (response.status === 200) {
		// 		window.location.href = '/';
		// 		setCookie('token_admin', response.data.token);
		// 		toast.success('Login success');
		// 	}
		// } catch (error) {
		// 	if (axios.isAxiosError(error)) {
		// 		toast.error(error.response?.data.message);
		// 	}
		// } finally {
		// 	setIsPending(false);
		// }
	};

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='space-y-1'>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='name@example.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='space-y-1'>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput placeholder='********' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} className='mt-2'>
							{isPending && <Loader className='mr-2 size-4 animate-spin' />}
							Login
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FormAuthAdmin;
