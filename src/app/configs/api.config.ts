export const API_URL = `${process.env.NEXT_PUBLIC_APP_API_URL}/api`;

export const getGenresUrl = (slug?: string) =>
	slug ? `/genre/${slug}` : `/genre`;
