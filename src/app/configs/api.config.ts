export const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

export const getGenresUrl = (slug?: string) =>
	slug ? `/genre/${slug}` : `/genre`;

export const getMoviesUrl = (slug?: string) =>
	slug ? `/movie/${slug}` : `/movie`;
