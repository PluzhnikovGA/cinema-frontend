'use client';

import { ReactNode } from 'react';

import '@/assets/styles/globals.scss';

import HeadProvider from '@/providers/HeadProvider';
import { MainProvider } from '@/providers/MainProvider';

interface IRootLayoutProps {
	children: ReactNode;
}

const RootLayout = (props: IRootLayoutProps) => {
	const { children } = props;
	return (
		<html lang="en">
			<HeadProvider />
			<body>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
};

export default RootLayout;
