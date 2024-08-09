'use client';

import { useEffect, useState } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TMaterialIconName } from '@/shared/types/icon.types';

interface MaterialIconProps {
	name: TMaterialIconName;
}

export function MaterialIcon(props: MaterialIconProps): JSX.Element | null {
	const { name } = props;
	const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
		null
	);

	useEffect(() => {
		const icon = MaterialIcons[name] || MaterialIcons.MdDragIndicator;
		setIconComponent(() => icon);
	}, [name]);

	if (!IconComponent) return null;

	return <IconComponent />;
}
