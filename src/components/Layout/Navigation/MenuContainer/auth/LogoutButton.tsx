import { MouseEvent } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon/MaterialIcon';

import { useActions } from '@/hooks/useActions';

export function LogoutButton(): JSX.Element {
	const { logout } = useActions();

	const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		logout();
	};
	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	);
}
