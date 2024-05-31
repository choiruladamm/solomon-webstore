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
import { registUserDto } from '@/dto/regist-user.dto';
import {
	DialogConfirmEmail,
	FormEmail,
	OtpVerification,
	SelectVerification,
} from '@/modules/partials/auth';
import FormRegister from './form-register';

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

	const handleOpenDialogConfirm = async () => {
		setIsPending(true);
		setIsDialogConfirmOpen(true);
		await new Promise(resolve => setTimeout(resolve, 1500));
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
					<FormEmail
						form={formSendOtp}
						isPending={isPending}
						onSubmit={handleOpenDialogConfirm}
						buttonText='Daftar'
					/>

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
				<SelectVerification
					email={formSendOtp.getValues('email')}
					onBack={() => setStepOtp(1)}
					onSelectMethod={() => {
						console.log(`
							send otp to ${formSendOtp.getValues('email')}
						`);
						setStepOtp(3);
					}}
				/>
			)}

			{stepOtp === 3 && (
				<OtpVerification
					email={formSendOtp.getValues('email')}
					form={formVerifOtp}
					isPending={isPending}
					onBack={() => setStepOtp(1)}
					onSubmit={handleVerifOtp}
				/>
			)}

			{stepOtp === 4 && (
				<FormRegister
					email={formSendOtp.getValues('email')}
					form={formRegistUser}
					isPending={isPending}
					onBack={() => setStepOtp(1)}
					onSubmit={handleRegistUser}
				/>
			)}

			<DialogConfirmEmail
				email={formSendOtp.getValues('email')}
				isOpen={isDialogConfirmOpen}
				onClose={() => {
					setIsDialogConfirmOpen(false);
					setIsPending(false);
				}}
				onConfirm={() => {
					setStepOtp(2);
					setIsPending(false);
					setIsDialogConfirmOpen(false);
					console.log(formSendOtp.getValues('email'));
				}}
			/>
		</main>
	);
};

export default AuthRegisterPage;
