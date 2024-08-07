import Cookie from 'js-cookie';

import { getAuthUrl } from '@/configs/api.config';

import { IAuthResponse } from '@/store/user/user.interface';

import { removeTokensStorage, saveToStorage } from './auth.helper';
import { getContentType } from '@/api/api.helper';
import { axiosClassic } from '@/api/interceptors';

export const authService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		);

		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		);

		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},

	async logout() {
		removeTokensStorage();
		localStorage.removeItem('user');
	},

	async getNewTokens() {
		const refreshToken = Cookie.get('refreshToken');
		const response = await axiosClassic.post<IAuthResponse>(
			'/login/access-token',
			{ refreshToken },
			{ headers: getContentType() }
		);

		if (response.data.accessToken) saveToStorage(response.data);

		return response;
	},
};
