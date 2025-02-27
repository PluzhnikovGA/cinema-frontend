import styles from './Layout.module.scss';
import { Navigation } from './Navigation/Navigation';
import { Sidebar } from './Sidebar/Sidebar';
import { ILayoutProps } from './layout.interface';

export function Layout(props: ILayoutProps): JSX.Element {
	const { children } = props;
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	);
}
