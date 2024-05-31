import React, { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogConfirmEmailProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	email: string;
}

const DialogConfirmEmail: FC<DialogConfirmEmailProps> = props => {
	const { isOpen, onClose, onConfirm, email } = props;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='rounded-xl text-center'>
				<div className='space-y-3'>
					<h3 className='text-base leading-none'>{email}</h3>
					<p>Apakah email yang Anda masukkan sudah benar?</p>
					<div className='flex gap-x-3'>
						<Button className='w-full' variant='outline' onClick={onClose}>
							Ubah
						</Button>
						<Button className='w-full' onClick={onConfirm}>
							Ya, Benar
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogConfirmEmail;
