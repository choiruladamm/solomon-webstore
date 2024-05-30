'use client';

import React, { FC } from 'react';

import { ArrowLeft, Loader, Mail } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface AuthRegisterPageProps {}

const AuthRegisterPage: FC<AuthRegisterPageProps> = ({}) => {
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
		setIsPending(true);
		setIsDialogConfirmOpen(true);
		await new Promise(resolve => setTimeout(resolve, 1500));

		setIsPending(false);
	};

	return (
		<main>
			{stepOtp === 1 && (
				<div className='layout mt-3 space-y-6 sm:hidden'>
					{/* heading */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-x-4'>
							<Link href='/'>
								<ArrowLeft strokeWidth={1.5} className='size-7' />
							</Link>
							<span className='text-lg font-bold'>Daftar ke Bromen</span>
						</div>
						<Link href='/login' className='font-medium hover:text-primary'>
							Masuk
						</Link>
					</div>

					{/* form */}
					<div className={cn('grid gap-6')}>
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

								<Button
									onClick={() => form.handleSubmit(handleOpenDialogConfirm)}
									disabled={isPending}
									className='w-full font-semibold'
								>
									{isPending && <Loader className='mr-2 size-4 animate-spin' />}
									Daftar
								</Button>
							</form>
						</Form>
					</div>

					{/* footer */}
					<div className='text-center leading-6 tracking-tight'>
						Dengan mendaftar, saya menyetujui <br />
						<Link href='/register' className='font-bold text-primary'>
							Syarat & Ketentuan
						</Link>{' '}
						serta{' '}
						<Link href='/register' className='font-bold text-primary'>
							Kebijakan Privasi Bromen.
						</Link>
					</div>
				</div>
			)}

			{stepOtp === 2 && (
				<div className='layout mt-3 space-y-8 bg-white sm:hidden'>
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
							<h3 className='text-lg tracking-tight'>Pilih Metode Verifikasi</h3>
							<p className='tracking-tighter'>
								Pilih salah satu metode dibawah ini untuk mendapatkan kode
								verifikasi.
							</p>
						</div>

						<div
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
								setStepOtp(3);
							}}
							className='rounded-xl border border-gray-300 p-4 text-left shadow-sm'
						>
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

			{stepOtp === 3 && (
				<div className='layout mt-3 space-y-8 bg-white sm:hidden'>
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
							<Mail strokeWidth={2} className='size-10 mx-auto' />
							<h3 className='text-lg tracking-tight'>Masukkan Kode Verifikasi</h3>
							<p className='tracking-tighter'>
								Kode verifikasi telah dikirim melalui e-mail ke <br />
								{form.getValues('email')}
							</p>
						</div>
					</div>
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
							<Button
								className='w-full'
								onClick={() => {
									setStepOtp(2);
									setIsPending(false);
									setIsDialogConfirmOpen(false);
								}}
							>
								Ya, Benar
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default AuthRegisterPage;

const sendOtpDto = z.object({
	email: z
		.string()
		.min(1, { message: 'Email harus diisi' })
		.email({ message: 'Format email salah' }),
});
