import React, { FC } from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PasswordInput } from '@/components/custom-ui/password-input';
import { loginUserDto } from '@/dto/login-user.dto';
interface FormLoginProps {
	form: UseFormReturn<z.infer<typeof loginUserDto>>;
	isPending: boolean;
	onSubmit: (data: z.infer<typeof loginUserDto>) => void;
	extraComponent?: React.ReactNode;
}

const FormLogin: FC<FormLoginProps> = props => {
	const { form, isPending, onSubmit, extraComponent } = props;

	return (
		<div className={cn('grid gap-6')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-3'>
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
						{extraComponent}
						<Button
							type='submit'
							disabled={isPending}
							className='w-full font-semibold'
						>
							{isPending && <Loader className='mr-2 size-4 animate-spin' />}
							Masuk
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FormLogin;
