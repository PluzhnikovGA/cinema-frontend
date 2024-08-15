import { Heading } from '@/ui/Heading/Heading';
import Slider from '@/ui/Slider/Slider';
import { ISlide } from '@/ui/Slider/slider.interface';

import { Meta } from '@/utils/meta/Meta';

interface IHomeProps {
	slides: ISlide[];
}

const TITLE = 'Watch movie online';
const DESCRIPTION =
	'Watch MovieApp movies and TV shows online or stream right to your browser';

export function Home(props: IHomeProps): JSX.Element {
	const { slides } = props;

	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className="text-gray-300 mb-8 text-xl" />

			{slides.length && <Slider slides={slides} />}
		</Meta>
	);
}
