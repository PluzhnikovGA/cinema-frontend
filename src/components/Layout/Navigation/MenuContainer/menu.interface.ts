import { TMaterialIconName } from '@/shared/types/icon.types';

export interface IMenuItem {
	icon: TMaterialIconName;
	title: string;
	link: string;
}

export interface IMenu {
	title: string;
	items: IMenuItem[];
}
