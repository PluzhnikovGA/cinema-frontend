import cn from 'classnames';
import parse from 'html-react-parser';

import styles from './Description.module.scss';

interface IDescriptionProps {
	text: string;
	className?: string;
}

export default function Description(props: IDescriptionProps): JSX.Element {
	const { text, className } = props;
	return <div className={cn(styles.wrapper, className)}>{parse(text)}</div>;
}
