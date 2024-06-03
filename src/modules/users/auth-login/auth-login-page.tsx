'use client';

import React, { FC } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { sendOtpDto } from '@/dto/send-otp.dto';
import { otpDto } from '@/dto/otp.dto';
import {
	DialogConfirmEmail,
	FormEmail,
	OtpVerification,
	SelectVerification,
} from '@/modules/partials/auth';
import SheetHelper from './sheet-helper';
import FormLogin from './form-login';
import { loginUserDto } from '@/dto/login-user.dto';
import axios, { AxiosError } from 'axios';
import { apiBackendUrl } from '@/lib/utils';
import { setCookie } from 'cookies-next';
import { toast } from 'sonner';

interface AuthLoginPageProps {}

const AuthLoginPage: FC<AuthLoginPageProps> = ({}) => {
	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [isDialogConfirmOpen, setIsDialogConfirmOpen] =
		React.useState<boolean>(false);
	const [stepOtp, setStepOtp] = React.useState<number>(1);
	const [isOpenSheet, setIsOpenSheet] = React.useState<boolean>(false);

	const router = useRouter();

	const formLogin = useForm<z.infer<typeof loginUserDto>>({
		mode: 'onChange',
		resolver: zodResolver(loginUserDto),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// const formVerifOtp = useForm<z.infer<typeof otpDto>>({
	// 	mode: 'onChange',
	// 	resolver: zodResolver(otpDto),
	// 	defaultValues: {
	// 		otp: '',
	// 	},
	// });

	// const handleOpenDialogConfirm = async () => {
	// 	setIsPending(true);
	// 	setIsDialogConfirmOpen(true);
	// 	await new Promise(resolve => setTimeout(resolve, 1500));
	// };

	// const handleVerifOtp = async (data: z.infer<typeof otpDto>) => {
	// 	setIsPending(true);
	// 	await new Promise(resolve => setTimeout(resolve, 1500));
	// 	console.log(`Email: ${formLogin.getValues('email')}, OTP: ${data.otp}`);

	// 	router.replace('/');
	// 	setIsPending(false);
	// };

	const handleLoginUser = async (data: z.infer<typeof loginUserDto>) => {
		setIsOpenSheet(false);
		setIsPending(true);
		await new Promise(resolve => setTimeout(resolve, 3000));

		const body = {
			email: data.email,
			password: data.password,
		};

		try {
			const res = await axios.post(`${apiBackendUrl}/users/login`, body);
			if (res.status === 201) {
				router.replace('/');
				setCookie('t_user', res.data.access_token);
				toast.success('Berhasil Login');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message[0] || 'Gagal Login');
			}
		}
	};

	return (
		<main>
			<div className='layout mt-3 space-y-6 sm:hidden'>
				{/* heading */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-4'>
						<Link href='/'>
							<ArrowLeft strokeWidth={1.5} className='size-7' />
						</Link>
						<span className='text-lg font-bold'>Masuk ke Bromen</span>
					</div>
					<Link href='/register' className='font-medium hover:text-primary'>
						Daftar
					</Link>
				</div>

				{/* form */}
				<FormLogin
					form={formLogin}
					isPending={isPending}
					onSubmit={handleLoginUser}
					extraComponent={
						<>
							<div className='text-right leading-5 tracking-tight'>
								<button
									onClick={() => setIsOpenSheet(true)}
									className='font-medium text-primary'
								>
									Butuh bantuan?
								</button>
							</div>
							<SheetHelper open={isOpenSheet} onOpenChange={setIsOpenSheet} />
						</>
					}
				/>

				{/* footer */}
				<div className='text-center leading-5 tracking-tight'>
					Belum punya akun?{' '}
					<Link href='/register' className='font-bold text-primary'>
						Daftar sekarang
					</Link>
				</div>
			</div>

			{/* {stepOtp === 2 && (
				<SelectVerification
					email={formLogin.getValues('email')}
					onBack={() => setStepOtp(1)}
					onSelectMethod={() => {
						console.log(`
							send otp to ${formLogin.getValues('email')}
						`);
						setStepOtp(3);
					}}
				/>
			)} */}

			{/* {stepOtp === 3 && (
				<OtpVerification
					email={formLogin.getValues('email')}
					form={formVerifOtp}
					isPending={isPending}
					onBack={() => setStepOtp(1)}
					onSubmit={handleVerifOtp}
				/>
			)} */}

			{/* <DialogConfirmEmail
				email={formLogin.getValues('email')}
				isOpen={isDialogConfirmOpen}
				onClose={() => {
					setIsDialogConfirmOpen(false);
					setIsPending(false);
				}}
				onConfirm={() => {
					setStepOtp(2);
					setIsPending(false);
					setIsDialogConfirmOpen(false);
					console.log(formLogin.getValues('email'));
				}}
			/> */}
		</main>
	);
};

export default AuthLoginPage;
