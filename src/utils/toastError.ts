import { toastr } from 'react-redux-toastr';

import { errorCatch } from '@/api/api.helper';

export function toastError(error: any, title?: string): void {
	const message = errorCatch(error);
	console.log('message', message);

	toastr.error(title || 'error request', message);

	throw message;
}
