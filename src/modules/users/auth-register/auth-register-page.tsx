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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/custom-ui/password-input';
import { useRouter } from 'next/navigation';
import { sendOtpDto } from '@/dto/send-otp.dto';
import { otpDto } from '@/dto/otp.dto';
import { registUserDto } from '@/dto/regist-user.dto';

interface AuthRegisterPageProps {}

const AuthRegisterPage: FC<AuthRegisterPageProps> = ({}) => {
	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [isDialogConfirmOpen, setIsDialogConfirmOpen] =
		React.useState<boolean>(false);
	const [stepOtp, setStepOtp] = React.useState<number>(1);

	const router = useRouter();

	const formSendOtp = useForm<z.infer<typeof sendOtpDto>>({
		mode: 'onChange',
		resolver: zodResolver(sendOtpDto),
		defaultValues: {
			email: '',
		},
	});

	const formVerifOtp = useForm<z.infer<typeof otpDto>>({
		mode: 'onChange',
		resolver: zodResolver(otpDto),
		defaultValues: {
			otp: '',
		},
	});

	const formRegistUser = useForm<z.infer<typeof registUserDto>>({
		mode: 'onChange',
		resolver: zodResolver(registUserDto),
		defaultValues: {
			email: formSendOtp.getValues('email') || '',
			fullName: '',
			password: '',
		},
	});

	const handleOpenDialogConfirm = async (data: z.infer<typeof sendOtpDto>) => {
		setIsPending(true);
		setIsDialogConfirmOpen(true);
		await new Promise(resolve => setTimeout(resolve, 1500));

		setIsPending(false);
	};

	const handleVerifOtp = async (data: z.infer<typeof otpDto>) => {
		setIsPending(true);
		await new Promise(resolve => setTimeout(resolve, 1500));
		console.log(`Email: ${formSendOtp.getValues('email')}, OTP: ${data.otp}`);

		setIsPending(false);
		setStepOtp(4);
	};

	const handleRegistUser = async (data: z.infer<typeof registUserDto>) => {
		setIsPending(true);
		await new Promise(resolve => setTimeout(resolve, 3000));
		console.log(
			`Email: ${formSendOtp.getValues('email')}, Nama: ${data.fullName}, Password: ${data.password}`,
		);

		setIsPending(false);
		router.replace('/');
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
						<Form {...formSendOtp}>
							<form
								onSubmit={formSendOtp.handleSubmit(handleOpenDialogConfirm)}
								className='space-y-6'
							>
								<FormField
									control={formSendOtp.control}
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
							<h3 className='text-lg tracking-tight'>
								Pilih Metode Verifikasi
							</h3>
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
									<span>{formSendOtp.getValues('email')}</span>
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
							<Mail strokeWidth={2} className='mx-auto size-10' />
							<h3 className='text-lg tracking-tight'>
								Masukkan Kode Verifikasi
							</h3>
							<p className='tracking-tighter'>
								Kode verifikasi telah dikirim melalui e-mail ke <br />
								{formSendOtp.getValues('email')}
							</p>
						</div>

						<div className='space-y-3'>
							<Form {...formVerifOtp}>
								<form
									onSubmit={formVerifOtp.handleSubmit(handleVerifOtp)}
									className='space-y-4'
								>
									<div className='flex justify-center'>
										<FormField
											control={formVerifOtp.control}
											name='otp'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<InputOTP maxLength={6} {...field}>
															<InputOTPGroup>
																<InputOTPSlot index={0} />
																<InputOTPSlot index={1} />
																<InputOTPSlot index={2} />
															</InputOTPGroup>
															<InputOTPSeparator />
															<InputOTPGroup>
																<InputOTPSlot index={3} />
																<InputOTPSlot index={4} />
																<InputOTPSlot index={5} />
															</InputOTPGroup>
														</InputOTP>
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
										{isPending && (
											<Loader className='mr-2 size-4 animate-spin' />
										)}
										Verifikasi
									</Button>
								</form>
							</Form>

							<div className='tracking-tighter'>
								Tidak menerima kode?{' '}
								<button className='font-bold text-primary'>Kirim Ulang</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{stepOtp === 4 && (
				<div className='layout mt-3 space-y-8 bg-white sm:hidden'>
					{/* heading */}
					<div className='flex items-center gap-x-4'>
						<Link href='/'>
							<ArrowLeft strokeWidth={1.5} className='size-7' />
						</Link>
						<span className='text-lg font-bold'>Daftar dengan E-mail</span>
					</div>

					{/* form */}
					<div className={cn('grid gap-6')}>
						<Form {...formRegistUser}>
							<form
								onSubmit={formRegistUser.handleSubmit(handleRegistUser)}
								className='space-y-6'
							>
								<div className='space-y-3'>
									<FormField
										disabled
										name='email'
										control={formRegistUser.control}
										defaultValue={formSendOtp.getValues('email')}
										render={({ field }) => (
											<FormItem className='space-y-1'>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder={formSendOtp.getValues('email')}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formRegistUser.control}
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
										control={formRegistUser.control}
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
			)}

			<Dialog open={isDialogConfirmOpen} onOpenChange={setIsDialogConfirmOpen}>
				<DialogContent className='rounded-xl text-center'>
					<div className='space-y-3'>
						<h3 className='text-base leading-none'>
							{formSendOtp.getValues('email')}
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
									console.log(formSendOtp.getValues('email'));
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

