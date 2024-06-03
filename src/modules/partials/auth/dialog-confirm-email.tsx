import React, { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface DialogConfirmEmailProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	email: string;
	isEmailRegistered?: boolean;
}

const DialogConfirmEmail: FC<DialogConfirmEmailProps> = props => {
	const {
		isOpen,
		onClose,
		onConfirm,
		email,
		isEmailRegistered = false,
	} = props;

	const router = useRouter();

	let title: string;
	let desc: string;
	let buttonText: string;

	if (isEmailRegistered) {
		title = 'Email Sudah Terdaftar';
		desc = `Masuk dengan email ${email}`;
		buttonText = 'Masuk';
	} else {
		title = email;
		desc = 'Apakah email yang Anda masukkan sudah benar?';
		buttonText = 'Ya, Benar';
	}

	const handleConfirm = () => {
    if (isEmailRegistered) {
      router.push('/login');
    } else {
      onConfirm();
    }
  };

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='rounded-xl text-center'>
				<div className='space-y-5'>
					<h3 className='text-base leading-none line-clamp-1'>{title}</h3>
					<p className='tracking-tighter'>{desc}</p>
					<div className='flex gap-x-3'>
						<Button className='w-full' variant='outline' onClick={onClose}>
							Ubah
						</Button>
						<Button className='w-full' onClick={handleConfirm}>
							{buttonText}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogConfirmEmail;
