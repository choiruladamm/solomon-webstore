import { Metadata } from 'next';
import React, { FC } from 'react';

interface LayoutAdminProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: 'Admin Webstore - Next.js',
};

const LayoutAdmin: FC<LayoutAdminProps> = ({ children }) => {
	return <div>{children}</div>;
};

export default LayoutAdmin;
