import React, { FC } from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SheetHelperProps {
	open: boolean;
	onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetHelper: FC<SheetHelperProps> = ({ open, onOpenChange }) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side='bottom' className='p'>
				<div className='space-y-6 '>
					<h3 className=''>Butuh bantuan apa?</h3>
					<Button className='w-full font-semibold' variant='outline' asChild>
						<Link href='/reset-password'>Lupa kata sandi?</Link>
					</Button>
					<div className='text-center font-semibold'>
						Butuh bantuan lain?{' '}
						<Link href='/login' className='font-bold text-primary'>
							Hubungi Bromen Care
						</Link>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetHelper;
