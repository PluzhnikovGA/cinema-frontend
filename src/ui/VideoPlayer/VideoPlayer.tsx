'use client';

import cn from 'classnames';

import { useAuth } from '@/hooks/useAuth';

import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder';
import styles from './VideoPlayer.module.scss';
import useVideo from './useVideo';

interface IVideoPlayerProps {
	videoSource: string;
	slug: string;
}

export default function VideoPlayer(props: IVideoPlayerProps): JSX.Element {
	const { videoSource, slug } = props;
	const { actions, video, videoRef } = useVideo();
	const { user } = useAuth();

	return (
		<div className={cn(styles.wrapper, { [styles.wrapperNotAuth]: !user })}>
			{!!user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t-8`}
						preload="metadata"
					/>
					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						></div>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>
							<button onClick={actions.toggleVideo}>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>
							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>
							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>{' '}
								/{' '}
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	);
}
