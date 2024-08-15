import * as MaterialIcons from 'react-icons/md';

import { useRenderClient } from '@/hooks/useRenderClient';

import { TMaterialIconName } from '@/shared/types/icon.types';

interface MaterialIconProps {
	name: TMaterialIconName;
}

export function MaterialIcon(props: MaterialIconProps): JSX.Element | null {
	const { name } = props;
	const { isRenderClient } = useRenderClient();
	const IconComponent = MaterialIcons[name];

	if (isRenderClient)
		return <IconComponent /> || <MaterialIcons.MdDragIndicator />;
	else return null;
}
