import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import FormAuthAdmin from './form-auth-admin';

interface AuthAdminPageProps {}

const AuthAdminPage: FC<AuthAdminPageProps> = ({}) => {
	return (
		<div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div className='absolute inset-0 bg-black/50' />
				<Image
					src='https://api.storage.solomon.id/images/webdev/1716825000357-solomon_sustainable.webp'
					alt='Solomon Sustainable'
					className='absolute inset-0 h-full w-full object-cover'
					width={1920}
					height={1080}
					quality={100}
					priority
				/>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='mr-2 h-6 w-6'
					>
						<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
					</svg>
					Webstore Solomon Indo Global
				</div>

				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>
							&ldquo;The development of Solomon Indo Global ecosystem focuses on
							not only one aspect but also the sustainable development of
							it.&rdquo;
						</p>
						<footer className='text-sm'>PT. Solomon Indo Global</footer>
					</blockquote>
				</div>
			</div>
			<div className='lg:p-8'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Login Admin Webstore
						</h1>
						<p className='text-sm text-muted-foreground'>
							Enter your email and password below to log in to your account
						</p>
					</div>
					<FormAuthAdmin />
					<p className='px-8 text-center text-sm text-muted-foreground'>
						By clicking login, you agree to our{' '}
						<Link
							href='/admin/auth'
							className='underline underline-offset-4 hover:text-primary'
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							href='/admin/auth'
							className='underline underline-offset-4 hover:text-primary'
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthAdminPage;
