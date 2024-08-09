interface ISubHeadingProps {
	title: string;
}

export function SubHeading(props: ISubHeadingProps): JSX.Element {
	const { title } = props;

	return <h1 className={'text-white text-xl mb-5 font-semibold'}>{title}</h1>;
}
