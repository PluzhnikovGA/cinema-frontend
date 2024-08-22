import cn from 'classnames';

import { MaterialIcon } from '@/ui/MaterialIcon/MaterialIcon';

import styles from './SlideArrow.module.scss';

interface ISlideArrowProps {
	variant: 'left' | 'right';
	clickHandler: () => void;
}

export default function SlideArrow(props: ISlideArrowProps): JSX.Element {
	const { variant, clickHandler } = props;

	const isLeft = variant === 'left';

	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
			aria-label={isLeft ? 'previous slide' : 'next slide'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	);
}
