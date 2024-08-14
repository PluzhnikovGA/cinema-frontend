import axios from '@/api/interceptors';

export const FileService = {
	async upload(file: FormData, folder?: string) {
		console.log(file);
		return axios.post<{ url: string; name: string }[]>('/file', file, {
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
