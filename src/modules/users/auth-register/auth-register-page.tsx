import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FormSendOtp } from '@/modules/partials';

interface AuthRegisterPageProps {}

const AuthRegisterPage: FC<AuthRegisterPageProps> = ({}) => {
	return (
		<main className=''>
			<div className='layout mt-3 space-y-5 md:hidden'>
				{/* heading */}
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-4'>
						<Link href='/'>
							<ArrowLeft strokeWidth={1.5} className='size-7' />
						</Link>
						<span className='text-lg font-bold'>Daftar ke Bromen</span>
					</div>
					<Link href='/login' className='hover:text-primary font-medium'>
						Masuk
					</Link>
				</div>

				{/* form */}
				<FormSendOtp />

				{/* footer */}
				<div className='text-center leading-5 tracking-tight'>
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
		</main>
	);
};

export default AuthRegisterPage;
