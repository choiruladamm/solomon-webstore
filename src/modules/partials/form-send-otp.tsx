'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { FC, useState } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

interface FormSendOtpProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormSendOtp: FC<FormSendOtpProps> = ({ className, ...props }) => {
	const [isPending, setIsPending] = useState<boolean>(false);

	const form = useForm<z.infer<typeof sendOtpDto>>({
		mode: 'onChange',
		resolver: zodResolver(sendOtpDto),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof sendOtpDto>) => {};

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-1'>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='email@bromen.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						disabled={isPending}
						className='w-full font-semibold'
					>
						Daftar
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default FormSendOtp;

const sendOtpDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Email harus diisi' })
		.email({ message: 'Format email salah' }),
});
