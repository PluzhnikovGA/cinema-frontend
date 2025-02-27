import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IVideoElement } from './video.interface';

export default function useVideo() {
	const videoRef = useRef<IVideoElement>(null);

	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [videoTime, setVideoTime] = useState<number>(0);
	const [progress, serProgress] = useState<number>(0);

	useEffect(() => {
		const originalDuration = videoRef.current?.duration;

		if (originalDuration) setVideoTime(originalDuration);
	}, [videoRef.current?.duration]);

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play();
			setIsPlaying(true);
		} else {
			videoRef.current?.pause();
			setIsPlaying(false);
		}
	}, [isPlaying]);

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10;
	};

	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10;
	};

	const fullScreen = () => {
		const video = videoRef.current;

		if (!video) return;

		if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen();
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen();
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen();
		}
	};

	useEffect(() => {
		const video = videoRef.current;

		if (!video) return;

		function updateProgress() {
			setCurrentTime(video!.currentTime);
			serProgress((video!.currentTime / videoTime) * 100);
		}

		video.addEventListener('timeupdate', updateProgress);

		return () => {
			video.removeEventListener('timeupdate', updateProgress);
		};
	}, [videoTime]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowRight':
					forward();
					break;
				case 'ArrowLeft':
					revert();
					break;
				case ' ': {
					event.preventDefault();
					toggleVideo();
					break;
				}
				case 'f':
					fullScreen();
					break;
				default:
					return;
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [toggleVideo]);

	return useMemo(
		() => ({
			videoRef,
			actions: {
				fullScreen,
				revert,
				forward,
				toggleVideo,
			},
			video: {
				isPlaying,
				currentTime,
				progress,
				videoTime,
			},
		}),
		[isPlaying, currentTime, progress, videoTime, toggleVideo]
	);
}
