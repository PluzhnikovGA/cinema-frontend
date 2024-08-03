import { Menu } from './Menu/Menu';
import { firstMenu, userMenu } from './menu.data';

export function MenuContainer() {
	return (
		<div>
			<Menu menu={firstMenu} />
			<Menu menu={userMenu} />
		</div>
	);
}
