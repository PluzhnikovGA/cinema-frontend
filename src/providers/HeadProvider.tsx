'use client';

import Head from 'next/head';

import Favicons from './Favicons';

interface HeadProviderProps {
	children?: React.ReactNode;
}

export default function HeadProvider(props: HeadProviderProps): JSX.Element {
	const { children } = props;

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<Favicons />
				<meta name="theme-color" content="#18181e" />
				<meta name="msapplication-navbutton-color" content="#18181e" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#18181e" />
			</Head>
			{children}
		</>
	);
}
