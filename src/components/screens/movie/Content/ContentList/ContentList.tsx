import Link from 'next/link';

import styles from './ContentList.module.scss';

interface ILink {
	_id: string;
	link: string;
	title: string;
}

interface IContentListProps {
	name: string;
	links: ILink[];
}

export default function ContentList(props: IContentListProps): JSX.Element {
	const { links, name } = props;

	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{links.map((link: ILink, index: number) => (
					<>
						<Link href={link.link}>{link.title}</Link>
						{index + 1 === links.length ? '' : ', '}
					</>
				))}
			</div>
		</div>
	);
}
