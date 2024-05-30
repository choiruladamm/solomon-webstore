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
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';

interface FormSendOtpProps extends React.HTMLAttributes<HTMLDivElement> {
	buttonText: string;
	extraComponent?: React.ReactNode;
}

const FormSendOtp: FC<FormSendOtpProps> = ({
	className,
	buttonText,
	extraComponent,

	...props
}) => {
	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [isDialogConfirmOpen, setIsDialogConfirmOpen] =
		React.useState<boolean>(false);
	const [stepOtp, setStepOtp] = React.useState<number>(1);

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


	return (
		<>
			{stepOtp === 1 && (
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
			)}

			<Dialog open={isDialogConfirmOpen} onOpenChange={setIsDialogConfirmOpen}>
				<DialogContent className='rounded-xl text-center'>
					<div className='space-y-3'>
						<h3 className='text-base leading-none'>
							{form.getValues('email')}
						</h3>
						<p>Apakah email yang Anda masukkan sudah benar?</p>
						<div className='flex gap-x-3'>
							<Button
								className='w-full'
								variant='outline'
								onClick={() => setIsDialogConfirmOpen(false)}
							>
								Ubah
							</Button>
							<Button className='w-full' onClick={() => setStepOtp(2)}>
								Ya, Benar
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{stepOtp === 2 && (
				<div className='layout mt-3 space-y-5 bg-white sm:hidden'>
					{/* heading */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-x-4'>
							<Link href='/register' onClick={() => setStepOtp(1)}>
								<ArrowLeft strokeWidth={1.5} className='size-7' />
							</Link>
						</div>
					</div>

					{/* content */}
					<div className='mx-auto space-y-8 text-center'>
						<div className='space-y-3'>
							<h3 className='text-xl'>Pilih Metode Verifikasi</h3>
							<p>
								Pilih salah satu metode dibawah ini untuk mendapatkan kode
								verifikasi.
							</p>
						</div>

						<div className='rounded-xl border border-gray-300 p-5 text-left shadow-sm'>
							<div className='flex items-center gap-x-3'>
								<Mail strokeWidth={1.5} className='size-10' />
								<div>
									<p className='text-base font-bold'>E-mail ke</p>
									<span>{form.getValues('email')}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
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
