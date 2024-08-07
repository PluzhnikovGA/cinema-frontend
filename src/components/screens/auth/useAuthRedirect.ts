import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

export function useAuthRedirect() {
	const { user } = useAuth();

	const { push } = useRouter();
	const searchParams = useSearchParams();

	const redirect = searchParams.get('redirect') || '/';

	useEffect(() => {
		if (user) push(redirect);
	}, [user, redirect, push]);
}
