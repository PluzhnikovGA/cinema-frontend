export const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api`;
export const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getGenresUrl = (string?: string) => `/genre${string}`;
export const getMoviesUrl = (string?: string) => `/movie${string}`;
export const getUsersUrl = (string: string) => `/user${string}`;
export const getActorsUrl = (string: string) => `/actor${string}`;
export const getRatingsUrl = (string: string) => `/rating${string}`;
