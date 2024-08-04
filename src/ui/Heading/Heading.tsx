interface IHeadingProps {
	title: string;
	className?: string;
}

export function Heading(props: IHeadingProps): JSX.Element {
	const { title, className } = props;

	return (
		<h1
			className={`text-white text-opacity-80 font-semibold ${
				className?.includes('xl') ? '' : 'text-3xl'
			} ${className}`}
		>
			{title}
		</h1>
	);
}
