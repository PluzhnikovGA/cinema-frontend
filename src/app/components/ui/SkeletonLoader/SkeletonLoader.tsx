import cn from 'classnames';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoaderProps extends SkeletonProps {
	count: number;
	firstItemClassName?: string;
	restItemsClassName?: string;
	name: string;
}

export function SkeletonLoader(props: SkeletonLoaderProps): JSX.Element {
	const { count, firstItemClassName, restItemsClassName, name, ...rest } =
		props;
	return (
		<>
			{Array.from({ length: count }).map(
				(_, index: number): JSX.Element => (
					<Skeleton
						key={`${name}-${index}`}
						{...rest}
						baseColor="#1f2125"
						highlightColor="#292a2e"
						className={cn(
							'rounded-lg',
							index === 0 ? firstItemClassName : restItemsClassName
						)}
					/>
				)
			)}
		</>
	);
}
