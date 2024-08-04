'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from '@/components/Layout/Layout';

interface IMainProviderProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export function MainProvider(props: IMainProviderProps): JSX.Element {
	const { children } = props;

	return (
		<QueryClientProvider client={queryClient}>
			<Layout>{children}</Layout>
		</QueryClientProvider>
	);
}
