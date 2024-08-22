import { NextPage } from 'next';
import { Suspense } from 'react';

import { Auth } from '@/components/screens/auth/Auth';

const AuthPage: NextPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Auth />
		</Suspense>
	);
};

export default AuthPage;
