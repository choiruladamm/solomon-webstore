import React, { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

	let title: string;
	let desc: string;
	let buttonText: string;

	if (isEmailRegistered) {
		title = 'Email sudah terdaftar';
		desc = `Masuk dengan email ${email}`;
		buttonText = 'Masuk';
	} else {
		title = email;
		desc = 'Apakah email yang Anda masukkan sudah benar?';
		buttonText = 'Ya, Benar';
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='rounded-xl text-center'>
				<div className='space-y-3'>
					<h3 className='text-base leading-none'>{title}</h3>
					<p>{desc}</p>
					<div className='flex gap-x-3'>
						<Button className='w-full' variant='outline' onClick={onClose}>
							Ubah
						</Button>
						<Button className='w-full' onClick={onConfirm}>
							{buttonText}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogConfirmEmail;
