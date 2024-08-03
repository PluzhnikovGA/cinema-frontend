import type { AppProps } from 'next/app';

import '../app/assets/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
