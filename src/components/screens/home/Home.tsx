import Gallery from '@/ui/Gallery/Gallery';
import { IGalleryItem } from '@/ui/Gallery/gallery.interface';
import { Heading } from '@/ui/Heading/Heading';
import Slider from '@/ui/Slider/Slider';
import { ISlide } from '@/ui/Slider/slider.interface';
import { SubHeading } from '@/ui/SubHeading/SubHeading';

import { Meta } from '@/utils/meta/Meta';

interface IHomeProps {
	slides: ISlide[];
	trendingMovies: IGalleryItem[];
	actors: IGalleryItem[];
}

const TITLE = 'Watch movie online';
const DESCRIPTION =
	'Watch MovieApp movies and TV shows online or stream right to your browser';

export function Home(props: IHomeProps): JSX.Element {
	const { slides, trendingMovies, actors } = props;

	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className="text-gray-300 mb-8 text-xl" />

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title={'Trending now'} />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div className="my-10">
				<SubHeading title={'Best actors'} />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	);
}
