import { toastr } from 'react-redux-toastr';

import { errorCatch } from '@/api/api.helper';

export function toastError(error: any, title?: string): void {
	const message = errorCatch(error);

	toastr.error(title || 'error request', message);

	throw message;
}
