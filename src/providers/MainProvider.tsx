'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { Layout } from '@/components/Layout/Layout';

import { store } from '@/store/store';

import ReduxToastr from './ReduxToastr';

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
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReduxToastr />
				<Layout>{children}</Layout>
			</QueryClientProvider>
		</Provider>
	);
}
