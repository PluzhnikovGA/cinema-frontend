import { MoviesContainer } from './MoviesContainer/MoviesContainer';
import { Search } from './Search/Search';
import styles from './Sidebar.module.scss';

export function Sidebar(): JSX.Element {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	);
}
