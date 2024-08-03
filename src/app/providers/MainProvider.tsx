import { QueryClient, QueryClientProvider } from 'react-query';

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
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
