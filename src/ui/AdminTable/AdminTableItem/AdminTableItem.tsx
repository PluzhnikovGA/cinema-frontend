import AdminActions from '../AdminActions/AdminActions';
import styles from '../AdminTable.module.scss';
import { ITableItem } from '../adminTable.interface';

export interface IAdminTableItemProps {
	tableItem: ITableItem;
	removeHandler: () => void;
}

export default function AdminTableItem(
	props: IAdminTableItemProps
): JSX.Element {
	const { removeHandler, tableItem } = props;

	return (
		<div className={styles.item}>
			{tableItem.items.map(
				(item, index): JSX.Element => (
					<div key={`${item}-${index}`}>{item}</div>
				)
			)}
			<AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
		</div>
	);
}
