import { error } from 'console';

export function getContentType() {
	return { 'Content-Type': 'application/json' };
}

export function errorCatch(error: any): string {
	return error.response && error.response.data
		? typeof error.response.data.message === 'object'
			? error.response.data.message[0]
			: error.response.data.message
		: error.message;
}
