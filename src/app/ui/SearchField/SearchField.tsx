import { ChangeEvent } from 'react';

import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

import styles from './SearchField.module.scss';

interface ISearchField {
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchField(props: ISearchField) {
	const { searchTerm, handleSearch } = props;
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input placeholder="search" value={searchTerm} onChange={handleSearch} />
		</div>
	);
}
