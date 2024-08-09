'use client';

import cn from 'classnames';
import { useQuery } from 'react-query';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { AdminService } from '@/services/admin.service';

import styles from './CountUser.module.scss';

export default function CountUser(): JSX.Element {
	const { isLoading, data } = useQuery('countUsers', () =>
		AdminService.getCountUsers()
	);

	return (
		<div className={cn(styles.block, styles.countUser)}>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={1}
						name="countUser"
						firstItemClassName="h-20 mb-1 font-medium"
					/>
				) : (
					data && <div className={styles.number}>{data}</div>
				)}
				<div>{!!data && data > 1 ? 'users' : 'user'}</div>
			</div>
		</div>
	);
}
