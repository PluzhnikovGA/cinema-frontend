import { Menu } from './Menu/Menu';
import { GenreMenu } from './genres/GenreMenu';
import { firstMenu, userMenu } from './menu.data';

export function MenuContainer() {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</div>
	);
}
