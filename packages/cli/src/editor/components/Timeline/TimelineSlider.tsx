import React, {createRef, useImperativeHandle, useMemo, useRef} from 'react';
import {Internals} from 'remotion';
import {useGetXPositionOfItemInTimeline} from '../../helpers/get-left-of-timeline-slider';
import {TimelineSliderHandle} from './TimelineSliderHandle';

const container: React.CSSProperties = {
	position: 'absolute',
	bottom: 0,
	top: 0,
	pointerEvents: 'none',
};

const line: React.CSSProperties = {
	height: '100%',
	width: 1,
	position: 'fixed',
	backgroundColor: '#f02c00',
};

export const redrawTimelineSliderFast = createRef<{
	draw: (frame: number) => void;
}>();

export const TimelineSlider: React.FC = () => {
	const timelinePosition = Internals.Timeline.useTimelinePosition();
	const {get} = useGetXPositionOfItemInTimeline();
	const ref = useRef<HTMLDivElement>(null);

	const style: React.CSSProperties = useMemo(() => {
		const left = get(timelinePosition);
		return {
			...container,
			transform: `translateX(${left}px)`,
		};
	}, [timelinePosition, get]);

	useImperativeHandle(redrawTimelineSliderFast, () => {
		return {
			draw: (frame) => {
				const {current} = ref;
				if (!current) {
					throw new Error('unexpectedly did not have ref to timelineslider');
				}

				current.style.transform = `translateX(${get(frame)}px)`;
			},
		};
	});

	return (
		<div ref={ref} style={style}>
			<div style={line}>
				<TimelineSliderHandle />
			</div>
		</div>
	);
};
