import { useAuth } from '@/hooks/useAuth';

import { getAdminHomeUrl } from '@/configs/url.config';

import { MenuItem } from '../MenuItem/MenuItem';

import { LogoutButton } from './LogoutButton';

export function AuthItems(): JSX.Element {
	const { user } = useAuth();

	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>
					<LogoutButton />
				</>
			) : (
				<MenuItem item={{ icon: 'MdLogin', link: '/auth', title: 'Login' }} />
			)}

			{user?.isAdmin && (
				<MenuItem
					item={{
						icon: 'MdOutlineLock',
						link: getAdminHomeUrl(),
						title: 'Admin panel',
					}}
				/>
			)}
		</>
	);
}
