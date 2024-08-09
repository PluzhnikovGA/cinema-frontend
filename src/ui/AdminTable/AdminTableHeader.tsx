import cn from 'classnames';

import styles from './AdminTable.module.scss';

interface IAdminTableHeaderProps {
	headerItems: string[];
}

export default function AdminTableHeader(
	props: IAdminTableHeaderProps
): JSX.Element {
	const { headerItems } = props;
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map(
				(item): JSX.Element => (
					<div key={item}>{item}</div>
				)
			)}
			<div>Actions</div>
		</div>
	);
}
