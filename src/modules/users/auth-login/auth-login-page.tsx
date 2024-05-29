'use client';

import { FormSendOtp } from '@/modules/partials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
import SheetHelper from './sheet-helper';

interface AuthLoginPageProps {}

const AuthLoginPage: FC<AuthLoginPageProps> = ({}) => {
	const [isOpenSheet, setIsOpenSheet] = React.useState<boolean>(false);

	return (
		<main>
			<div className='layout mt-3 space-y-5 sm:hidden'>
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

				{/* form  & helper */}
				<FormSendOtp
					buttonText='Lanjut'
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
		</main>
	);
};

export default AuthLoginPage;
