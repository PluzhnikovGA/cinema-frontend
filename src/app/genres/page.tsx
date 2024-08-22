import { NextPage } from 'next';

import Collections, {
	ICollection,
} from '@/components/screens/collections/Collections';

import { GenreService } from '@/services/genre.service';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	collections: ICollection[];
	notFound: boolean;
}

const DiscoveryPage: NextPage = async () => {
	const response = await getStaticData();

	return <Collections {...response} />;
};

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const { data: collections } = await GenreService.getCollections();

		return {
			collections,
			notFound: false,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { collections: [], notFound: true };
	}
}

export default DiscoveryPage;
