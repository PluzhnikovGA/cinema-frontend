'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IAdminNavItem } from '../adminNavigation.interface';

import styles from './AdminNaItem.module.scss';

export default function AdminNaItem(props: IAdminNavItem) {
	const { title, link } = props;
	const pathname = usePathname();

	return (
		<li className={styles.item}>
			<Link
				href={link}
				className={cn({
					[styles.active]: pathname === link,
				})}
			>
				{title}
			</Link>
		</li>
	);
}
