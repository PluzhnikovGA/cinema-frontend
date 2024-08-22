'use client';

import { useRouter } from 'next/navigation';

import { MaterialIcon } from '@/ui/MaterialIcon/MaterialIcon';

import styles from './AdminActions.module.scss';

interface IAdminActions {
	editUrl: string;
	removeHandler: () => void;
}

export default function AdminActions(props: IAdminActions): JSX.Element {
	const { editUrl, removeHandler } = props;
	const { push } = useRouter();

	return (
		<div className={styles.actions}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdDelete" />
			</button>
		</div>
	);
}
