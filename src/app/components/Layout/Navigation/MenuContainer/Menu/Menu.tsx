import { MenuItem } from '../MenuItem/MenuItem';
import { AuthItems } from '../auth/AuthItem';
import { IMenu, IMenuItem } from '../menu.interface';

import styles from './Menu.module.scss';

export interface IMenuProps {
	menu: IMenu;
}

export function Menu(props: IMenuProps): JSX.Element {
	const { menu } = props;
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>{menu.title}</div>
			<ul className={styles.list}>
				{menu.items.map(
					(item: IMenuItem): JSX.Element => (
						<MenuItem key={item.link} item={item} />
					)
				)}
				{menu.title === 'General' ? <AuthItems /> : null}
			</ul>
		</div>
	);
}
