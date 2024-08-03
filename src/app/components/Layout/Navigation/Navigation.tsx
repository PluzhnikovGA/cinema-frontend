import { Logo } from './Logo/Logo';
import { MenuContainer } from './MenuContainer/MenuContainer';
import styles from './Navigation.module.scss';

export function Navigation(): JSX.Element {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	);
}
