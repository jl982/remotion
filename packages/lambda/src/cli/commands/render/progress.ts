import {CliInternals} from '@remotion/cli';
import {CleanupInfo, EncodingProgress, RenderProgress} from '../../../defaults';

type LambdaInvokeProgress = {
	totalLambdas: number | null;
	lambdasInvoked: number;
	doneIn: number | null;
};

type ChunkProgress = {
	totalChunks: number | null;
	chunksInvoked: number;
	doneIn: number | null;
};

export type MultiRenderProgress = {
	lambdaInvokeProgress: LambdaInvokeProgress;
	chunkProgress: ChunkProgress;
	encodingProgress: EncodingProgress;
	cleanupInfo: CleanupInfo | null;
};

export const makeInvokeProgress = (chunkProgress: LambdaInvokeProgress) => {
	const {lambdasInvoked, totalLambdas, doneIn} = chunkProgress;
	return [
		'🌩 ',
		`(1/4)`,
		CliInternals.makeProgressBar(
			totalLambdas === null ? 0 : lambdasInvoked / totalLambdas
		),
		`${doneIn === null ? 'Invoking' : 'Invoked'} lambdas`,
		doneIn === null
			? `${Math.round(
					totalLambdas === null ? 0 : (lambdasInvoked / totalLambdas) * 100
			  )}%`
			: CliInternals.chalk.gray(`${doneIn}ms`),
	].join(' ');
};

export const makeChunkProgress = (chunkProgress: ChunkProgress) => {
	const {chunksInvoked, totalChunks, doneIn} = chunkProgress;
	return [
		'🧩',
		`(2/4)`,
		CliInternals.makeProgressBar(
			totalChunks === null ? 0 : chunksInvoked / totalChunks
		),
		`${doneIn === null ? 'Rendering' : 'Rendered'} chunks`,
		doneIn === null
			? `${Math.round(
					totalChunks === null ? 0 : (chunksInvoked / totalChunks) * 100
			  )}%`
			: CliInternals.chalk.gray(`${doneIn}ms`),
	].join(' ');
};

export const makeEncodingProgress = (encodingProgress: EncodingProgress) => {
	const {framesEncoded, totalFrames, doneIn} = encodingProgress;
	return [
		'📽 ',
		`(3/4)`,
		CliInternals.makeProgressBar(
			totalFrames === null ? 0 : framesEncoded / totalFrames
		),
		`${doneIn === null ? 'Encoding' : 'Encoded'} frames`,
		doneIn === null
			? `${Math.round(
					totalFrames === null ? 0 : (framesEncoded / totalFrames) * 100
			  )}%`
			: CliInternals.chalk.gray(`${doneIn}ms`),
	].join(' ');
};

export const makeCleanupProgress = (cleanupInfo: CleanupInfo | null) => {
	if (!cleanupInfo) {
		return '';
	}

	const {done, filesDeleted, filesToDelete} = cleanupInfo;
	return [
		'🪣 ',
		`(4/4)`,
		CliInternals.makeProgressBar(filesDeleted / filesToDelete),
		`${done ? 'Cleaned up' : 'Cleaning up'} `,
		done
			? CliInternals.chalk.gray('TODOms')
			: `${Math.round((filesDeleted / filesToDelete) * 100)}%`,
	].join(' ');
};

export const makeMultiProgressFromStatus = (
	status: RenderProgress
): MultiRenderProgress => {
	return {
		chunkProgress: {
			chunksInvoked: status.chunks,
			totalChunks: status.renderMetadata?.totalChunks ?? null,
			// TODO: Define done in
			doneIn: null,
		},
		encodingProgress: {
			framesEncoded: status.encodingStatus?.framesEncoded ?? 0,
			totalFrames: status.encodingStatus?.totalFrames ?? null,
			// TODO: Define done in
			doneIn: null,
		},
		lambdaInvokeProgress: {
			doneIn: null,
			lambdasInvoked: status.lambdasInvoked,
			totalLambdas:
				status.renderMetadata?.estimatedRenderLambdaInvokations ?? null,
		},
		cleanupInfo: status.cleanup,
	};
};
