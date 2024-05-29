'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
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
import { Loader } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface FormSendOtpProps extends React.HTMLAttributes<HTMLDivElement> {
	buttonText: string;
	extraComponent?: React.ReactNode;
	setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const FormSendOtp: FC<FormSendOtpProps> = ({
	className,
	buttonText,
	extraComponent,
	setStep,
	...props
}) => {
	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [isDialogConfirmOpen, setIsDialogConfirmOpen] =
		React.useState<boolean>(false);

	const form = useForm<z.infer<typeof sendOtpDto>>({
		mode: 'onChange',
		resolver: zodResolver(sendOtpDto),
		defaultValues: {
			email: '',
		},
	});

	const handleOpenDialogConfirm = async (data: z.infer<typeof sendOtpDto>) => {
		// setIsPending(true);
		setIsDialogConfirmOpen(true);
		// await new Promise(resolve => setTimeout(resolve, 1000));
	};
	// try {
	// 	setStep && setStep(2);
	// } catch (error) {
	// } finally {
	// 	setIsPending(false);
	// }

	return (
		<>
			<div className={cn('grid gap-6', className)} {...props}>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleOpenDialogConfirm)}
						className='space-y-6'
					>
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
								onClick={() => form.handleSubmit(handleOpenDialogConfirm)}
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

			<Dialog open={isDialogConfirmOpen} onOpenChange={setIsDialogConfirmOpen}>
				<DialogContent className='text-center rounded-xl'>
					<div className='space-y-3'>
						<h3 className='text-base leading-none'>{form.getValues('email')}</h3>
						<p>Apakah email yang Anda masukkan sudah benar?</p>
						<div className='flex gap-x-3'>
							<Button
								className='w-full'
								variant='outline'
								onClick={() => setIsDialogConfirmOpen(false)}
							>
								Ubah
							</Button>
							<Button className='w-full' onClick={() => setStep && setStep(2)}>
								Ya, Benar
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default FormSendOtp;

const sendOtpDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Email harus diisi' })
		.email({ message: 'Format email salah' }),
});
