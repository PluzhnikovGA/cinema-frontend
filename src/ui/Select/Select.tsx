import { ControllerRenderProps } from 'react-hook-form';
import { OnChangeValue, Options } from 'react-select';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import { IFieldProps } from '../FormElements/Field/Field';

import styles from './Select.module.scss';

const animatedComponents = makeAnimated();

export interface ISelectOptions {
	label: string;
	value: string;
}

export interface ISelectProps extends IFieldProps {
	options: Options<ISelectOptions>;
	isMulti?: boolean;
	field: ControllerRenderProps<any, any>;
	isLoading?: boolean;
}

export default function Select(props: ISelectProps): JSX.Element {
	const { placeholder, error, isMulti, options, field, isLoading } = props;

	const onChange = (
		newValue: unknown | OnChangeValue<ISelectOptions, boolean>
	) => {
		field.onChange(
			isMulti
				? (newValue as ISelectOptions[]).map(
						(item: ISelectOptions): string => item.value
					)
				: (newValue as ISelectOptions).value
		);
	};

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : '';
		}
	};

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	);
}
