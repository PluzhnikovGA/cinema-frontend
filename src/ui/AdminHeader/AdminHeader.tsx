import { ChangeEvent } from 'react';

import { SearchField } from '@/ui/SearchField/SearchField';

import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import styles from './AdminHeader.module.scss';

interface IAdminHeaderProps {
	onClick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function AdminHeader(props: IAdminHeaderProps): JSX.Element {
	const { onClick, searchTerm, handleSearch } = props;

	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	);
}
