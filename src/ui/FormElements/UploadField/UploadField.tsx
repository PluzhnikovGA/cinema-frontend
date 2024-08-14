import cn from 'classnames';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { FieldError } from 'react-hook-form';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import styles from './UploadField.module.scss';
import { useUpload } from './useUpload';

interface IUploadFieldProps {
	folder?: string;
	value?: string;
	onChange: (...event: any[]) => void;
	placeholder: string;
	error?: FieldError;
	style?: CSSProperties;
	isNoImage?: boolean;
}

export default function UploadField(props: IUploadFieldProps): JSX.Element {
	const {
		folder,
		value,
		onChange,
		placeholder,
		error,
		style,
		isNoImage = false,
	} = props;
	const { isLoading, uploadFile } = useUpload(onChange, folder);

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader
								count={1}
								firstItemClassName="w-full h-full"
								name="image"
							/>
						) : (
							value && <Image alt="" src={value} fill unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	);
}
