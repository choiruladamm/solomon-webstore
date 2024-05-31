import React, { FC } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SelectVerificationProps {
	email: string;
	onBack: () => void;
	onSelectMethod: () => void;
}

const SelectVerification: FC<SelectVerificationProps> = props => {
	const { email, onBack, onSelectMethod } = props;
	return (
		<div className='layout mt-3 space-y-8 bg-white sm:hidden'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-x-4'>
					<Link href='/register' onClick={onBack}>
						<ArrowLeft strokeWidth={1.5} className='size-7' />
					</Link>
				</div>
			</div>
			<div className='mx-auto space-y-8 text-center'>
				<div className='space-y-3'>
					<h3 className='text-lg tracking-tight'>Pilih Metode Verifikasi</h3>
					<p className='tracking-tighter'>
						Pilih salah satu metode dibawah ini untuk mendapatkan kode
						verifikasi.
					</p>
				</div>
				<div
					onClick={onSelectMethod}
					className='rounded-xl border hover:cursor-pointer border-gray-300 p-4 text-left shadow-sm'
				>
					<div className='flex items-center gap-x-3'>
						<Mail strokeWidth={1.5} className='size-10' />
						<div>
							<p className='text-base font-bold'>E-mail ke</p>
							<span>{email}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectVerification;
