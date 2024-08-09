import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';

import styles from './AdminTable.module.scss';
import AdminTableHeader from './AdminTableHeader';
import AdminTableItem from './AdminTableItem/AdminTableItem';
import { ITableItem } from './admintable.interface';

interface IAdminTableProps {
	tableItems: ITableItem[];
	isLoading: boolean;
	headerItems: string[];
	removeHandler: (id: string) => void;
}

export default function AdminTable(props: IAdminTableProps): JSX.Element {
	const { tableItems, isLoading, headerItems, removeHandler } = props;

	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} name="UserList" firstItemClassName="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						tableItem={tableItem}
						removeHandler={() => removeHandler(tableItem._id)}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	);
}
