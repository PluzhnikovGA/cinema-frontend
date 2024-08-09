import CountUser from './CountUser/CountUser';
import PopularMovies from './PopularMovies/PopularMovies';
import styles from './Statistics.module.scss';

export default function Statistics() {
	return (
		<div className={styles.statistics}>
			<CountUser />
			<PopularMovies />
		</div>
	);
}
