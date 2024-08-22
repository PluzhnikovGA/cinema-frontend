export const IS_SERVER = typeof window === 'undefined';
export const IS_CLIENT = typeof window !== 'undefined';
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_APP_ENV === 'production';
