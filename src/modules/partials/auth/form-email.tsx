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
import { sendOtpDto } from '@/dto/send-otp.dto';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormEmailProps {
	form: UseFormReturn<z.infer<typeof sendOtpDto>>;
	isPending: boolean;
	onSubmit: () => void;
	extraComponent?: React.ReactNode;
	buttonText: string;
}

const FormEmail: FC<FormEmailProps> = props => {
	const { form, isPending, onSubmit, extraComponent, buttonText } = props;

	return (
		<div className={cn('grid gap-6')}>
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

					<div className='space-y-3'>
						{extraComponent}
						<Button
							type='submit'
							disabled={isPending}
							className='w-full font-semibold'
						>
							{isPending && <Loader className='mr-2 size-4 animate-spin' />}
							{buttonText}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FormEmail;
