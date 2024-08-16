import Actor from '@/components/screens/actor/Actor';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	movies: IMovie[];
	actor: IActor;
	notFound: boolean;
}

interface IActorPageProps {
	params: { slug: string };
}

const ActorPage = async ({ params: { slug } }: IActorPageProps) => {
	const response = await getStaticData(slug);

	return <Actor {...response} />;
};

async function getStaticData(slug: string): Promise<IGetStaticDataResponse> {
	try {
		const { data: actor } = await ActorService.getBySlug(slug);
		const { data: movies } = await MovieService.getByActor(actor._id);

		return {
			movies,
			actor,
			notFound: false,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { movies: [], actor: {} as IActor, notFound: true };
	}
}

export default ActorPage;
