interface IGenreItem {
	name: string;
}

export function getGenresList(array: IGenreItem[]): string {
	return array.map((item): string => item.name).join(', ');
}
