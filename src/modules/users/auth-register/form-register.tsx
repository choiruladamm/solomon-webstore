import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom-ui/password-input';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { registUserDto } from '@/dto/regist-user.dto';
import { ArrowLeft, Loader } from 'lucide-react';

interface FormRegisterProps {
	email: string;
	form: UseFormReturn<z.infer<typeof registUserDto>>;
	isPending: boolean;
	onSubmit: (data: z.infer<typeof registUserDto>) => void;
	onBack: () => void;
}

const FormRegister: FC<FormRegisterProps> = props => {
	const { email, form, isPending, onSubmit, onBack } = props;

	return (
		<div className='layout mt-3 space-y-8 bg-white sm:hidden'>
			<div className='flex items-center gap-x-4'>
				<Link href='/register' onClick={onBack}>
					<ArrowLeft strokeWidth={1.5} className='size-7' />
				</Link>
				<span className='text-lg font-bold'>Daftar dengan E-mail</span>
			</div>
			<div className={cn('grid gap-6')}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='space-y-3'>
							<FormField
								name='email'
								control={form.control}
								defaultValue={email}
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder={email} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem className='space-y-1'>
										<FormLabel>Nama Lengkap</FormLabel>
										<FormControl>
											<Input
												placeholder='Isi nama lengkap anda...'
												{...field}
											/>
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
											<PasswordInput
												placeholder='Isi password anda...'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							disabled={isPending}
							className='w-full font-semibold'
						>
							{isPending && <Loader className='mr-2 size-4 animate-spin' />}
							Daftar
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default FormRegister;
