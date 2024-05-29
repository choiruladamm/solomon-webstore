'use client';

import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { FormSendOtp } from '@/modules/partials';

interface AuthRegisterPageProps {}

const AuthRegisterPage: FC<AuthRegisterPageProps> = ({}) => {
	const [step, setStep] = React.useState<number>(1);

	return (
		<main>
			{step === 1 && (
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
					<FormSendOtp setStep={setStep} buttonText='Daftar' />

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

			{step === 2 && (
				<div className='layout space-y-5 bg-white sm:hidden'>
					{/* heading */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-x-4'>
							<Link href='/register' onClick={() => setStep(1)}>
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
							<div className='flex gap-x-3 items-center'>
								<Mail strokeWidth={1.5} className='size-10' />
								<div>
									<p className='text-base font-bold'>E-mail ke</p>
									<span>bromen@gmail.com</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default AuthRegisterPage;
