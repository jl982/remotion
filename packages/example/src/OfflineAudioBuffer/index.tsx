import {interpolate} from 'remotion'
import {useEffect, useState} from 'react';
import {Audio, Sequence, continueRender, delayRender, useVideoConfig} from 'remotion';

import toWav from 'audiobuffer-to-wav';

export const OfflineAudioBufferExample: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
	const { fps } = useVideoConfig();
	const C4_FREQUENCY = 261.63;
	const sampleRate = 44100;
	const audioDurationInFrames = 300;
	const lengthInSeconds = audioDurationInFrames / fps;

	const renderAudio = async () => {
		const offlineContext = new OfflineAudioContext({
			numberOfChannels: 2,
			length: sampleRate * lengthInSeconds,
			sampleRate,
		});
		const oscillatorNode = offlineContext.createOscillator();
		const gainNode = offlineContext.createGain();
		oscillatorNode.connect(gainNode);
		gainNode.connect(offlineContext.destination);
		gainNode.gain.setValueAtTime(.5, offlineContext.currentTime);

		oscillatorNode.type = "sine";
		oscillatorNode.frequency.value = C4_FREQUENCY;

		const {currentTime} = offlineContext;
		oscillatorNode.start(currentTime);
		oscillatorNode.stop(currentTime + lengthInSeconds);

		const buffer = await offlineContext.startRendering();

		const wavAsArrayBuffer = toWav(buffer);
		setAudioBuffer(wavAsArrayBuffer);

		continueRender(handle);
	};

	useEffect(() => {
		renderAudio();
	}, []);

	return (
		<div
			style={{
				fontFamily: 'Helvetica, Arial',
				fontSize: 50,
				background: '#908800',
				color: 'white',
				textAlign: 'center',
				position: 'absolute',
				bottom: 50,
				zIndex: 99999,
				padding: '20px',
				width: '100%'
			}}
		>
			{audioBuffer &&
				<Sequence from={100} durationInFrames={100}>
					<Audio
						fromAudioBuffer={audioBuffer}
						startFrom={0}
						endAt={100}
						volume={(f) =>
					interpolate(f, [0, 50, 100], [0, 1, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				}
			/>
				</Sequence>
			}
			Render sound from offline audio buffer
		</div>
	);
};

export default OfflineAudioBufferExample;
