export interface IGalleryItem {
	posterPath: string;
	name: string;
	link: string;
	content?: {
		title: string;
		subTitle?: string;
	};
}
