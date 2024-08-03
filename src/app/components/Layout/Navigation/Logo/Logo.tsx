import Image from 'next/image';
import Link from 'next/link';

import logoImage from '@/assets/images/logo.svg';

export function Logo(): JSX.Element {
	return (
		<Link href="/" className="px-layout mb-10 block">
			<Image
				src={logoImage}
				width={247}
				height={34}
				alt="Online cinema"
				draggable={false}
			/>
		</Link>
	);
}
