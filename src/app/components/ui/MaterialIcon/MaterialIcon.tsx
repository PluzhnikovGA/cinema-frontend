import * as MaterialIcons from 'react-icons/md';

import { TMaterialIconName } from '@/shared/types/icon.types';

interface MaterialIconProps {
	name: TMaterialIconName;
}

export function MaterialIcon(props: MaterialIconProps): JSX.Element {
	const { name } = props;
	const IconComponent = MaterialIcons[name];

	return IconComponent ? <IconComponent /> : <MaterialIcons.MdDragIndicator />;
}
