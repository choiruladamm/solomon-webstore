import React, { FC } from 'react';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { otpDto } from '@/dto/otp.dto';

interface OtpVerificationProps {
	email: string;
	form: UseFormReturn<z.infer<typeof otpDto>>;
	isPending: boolean;
	onBack: () => void;
	onSubmit: (data: z.infer<typeof otpDto>) => void;
}

const OtpVerification: FC<OtpVerificationProps> = props => {
	const { email, form, isPending, onBack, onSubmit } = props;

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
					<Mail strokeWidth={2} className='mx-auto size-10' />
					<h3 className='text-lg tracking-tight'>Masukkan Kode Verifikasi</h3>
					<p className='tracking-tighter'>
						Kode verifikasi telah dikirim melalui e-mail ke <br />
						{email}
					</p>
				</div>
				<div className='space-y-3'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<div className='flex justify-center'>
								<FormField
									control={form.control}
									name='otp'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<InputOTP maxLength={6} {...field}>
													<InputOTPGroup>
														<InputOTPSlot index={0} />
														<InputOTPSlot index={1} />
														<InputOTPSlot index={2} />
													</InputOTPGroup>
													<InputOTPSeparator />
													<InputOTPGroup>
														<InputOTPSlot index={3} />
														<InputOTPSlot index={4} />
														<InputOTPSlot index={5} />
													</InputOTPGroup>
												</InputOTP>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								type='submit'
								disabled={isPending}
								className='w-full font-semibold'
							>
								{isPending && <Loader className='mr-2 size-4 animate-spin' />}
								Verifikasi
							</Button>
						</form>
					</Form>
					<div className='tracking-tighter'>
						Tidak menerima kode?{' '}
						<button className='font-bold text-primary'>Kirim Ulang</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtpVerification;
