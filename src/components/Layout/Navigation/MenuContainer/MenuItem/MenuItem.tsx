'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { MaterialIcon } from '@/ui/MaterialIcon/MaterialIcon';

import { IMenuItem } from '../menu.interface';

import styles from './Menu.module.scss';

export interface IMenuItemProps {
	item: IMenuItem;
}

export function MenuItem(props: IMenuItemProps): JSX.Element {
	const { item } = props;

	const pathname = usePathname();

	return (
		<li className={cn({ [styles.active]: pathname === item.link })}>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	);
}
