import AdminNaItem from './AdminNaItem/AdminNaItem';
import styles from './AdminNavigation.module.scss';
import { adminNavItems } from './adminNavigation.data';
import { IAdminNavItem } from './adminNavigation.interface';

export default function AdminNavigation(): JSX.Element {
	return (
		<nav className={styles.nav}>
			<ul>
				{adminNavItems.map(
					(item: IAdminNavItem): JSX.Element => (
						<AdminNaItem key={item.title} title={item.title} link={item.link} />
					)
				)}
			</ul>
		</nav>
	);
}
