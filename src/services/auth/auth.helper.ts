import Cookie from 'js-cookie';

import { IAuthResponse, ITokens } from '@/store/user/user.interface';

export function saveLocalStorage(data: ITokens) {
	Cookie.set('accessToken', data.accessToken);
	Cookie.set('refreshToken', data.refreshToken);
}

export function saveToStorage(data: IAuthResponse) {
	saveLocalStorage(data);
	localStorage.setItem('user', JSON.stringify(data.user));
}

export function removeTokensStorage() {
	Cookie.remove('accessToken');
	Cookie.remove('refreshToken');
}
