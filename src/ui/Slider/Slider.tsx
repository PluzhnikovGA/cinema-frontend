'use client';

import { CSSTransition } from 'react-transition-group';

import SlideArrow from './SlideArrow/SlideArrow';
import SlideItem from './SlideItem/SlideItem';
import styles from './Slider.module.scss';
import { ISlide } from './slider.interface';
import { useSlider } from './useSlider';

interface ISliderProps {
	slides: ISlide[];
	buttonTitle?: string;
}

export default function Slider(props: ISliderProps): JSX.Element {
	const { slides, buttonTitle } = props;

	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	);

	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('prev')} />
			)}
			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	);
}
