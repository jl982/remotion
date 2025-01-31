import {RenderInternals} from '@remotion/renderer';
import type {RenderDefaults} from '@remotion/studio';
import {ConfigInternals} from './config';

export const getRenderDefaults = (): RenderDefaults => {
	const defaultJpegQuality = ConfigInternals.getJpegQuality();
	const defaultScale = ConfigInternals.getScale();
	const logLevel = ConfigInternals.Logging.getLogLevel();
	const defaultCodec = ConfigInternals.getOutputCodecOrUndefined();
	const concurrency = RenderInternals.getActualConcurrency(
		ConfigInternals.getConcurrency(),
	);
	const muted = ConfigInternals.getMuted();
	const enforceAudioTrack = ConfigInternals.getEnforceAudioTrack();
	const pixelFormat = ConfigInternals.getPixelFormat();
	const proResProfile = ConfigInternals.getProResProfile() ?? 'hq';
	const x264Preset = ConfigInternals.getPresetProfile() ?? 'medium';
	const audioBitrate = ConfigInternals.getAudioBitrate();
	const videoBitrate = ConfigInternals.getVideoBitrate();
	const encodingBufferSize = ConfigInternals.getEncodingBufferSize();
	const encodingMaxRate = ConfigInternals.getEncodingMaxRate();
	const everyNthFrame = ConfigInternals.getEveryNthFrame();
	const numberOfGifLoops = ConfigInternals.getNumberOfGifLoops();
	const delayRenderTimeout = ConfigInternals.getCurrentPuppeteerTimeout();
	const audioCodec = ConfigInternals.getAudioCodec();
	const stillImageFormat = ConfigInternals.getUserPreferredStillImageFormat();
	const videoImageFormat = ConfigInternals.getUserPreferredVideoImageFormat();
	const disableWebSecurity = ConfigInternals.getChromiumDisableWebSecurity();
	const beepOnFinish = ConfigInternals.getBeepOnFinish();
	const headless = ConfigInternals.getChromiumHeadlessMode();
	const ignoreCertificateErrors = ConfigInternals.getIgnoreCertificateErrors();
	const openGlRenderer = ConfigInternals.getChromiumOpenGlRenderer();
	const offthreadVideoCacheSizeInBytes =
		ConfigInternals.getOffthreadVideoCacheSizeInBytes();
	const colorSpace = ConfigInternals.getColorSpace();
	const userAgent = ConfigInternals.getChromiumUserAgent();

	const maxConcurrency = RenderInternals.getMaxConcurrency();
	const minConcurrency = RenderInternals.getMinConcurrency();
	const multiProcessOnLinux = ConfigInternals.getChromiumMultiProcessOnLinux();
	const repro = ConfigInternals.getRepro();

	return {
		jpegQuality: defaultJpegQuality ?? RenderInternals.DEFAULT_JPEG_QUALITY,
		scale: defaultScale ?? 1,
		logLevel,
		codec: defaultCodec ?? 'h264',
		concurrency,
		maxConcurrency,
		minConcurrency,
		stillImageFormat:
			stillImageFormat ?? RenderInternals.DEFAULT_STILL_IMAGE_FORMAT,
		videoImageFormat:
			videoImageFormat ?? RenderInternals.DEFAULT_VIDEO_IMAGE_FORMAT,
		muted,
		enforceAudioTrack,
		proResProfile,
		x264Preset,
		pixelFormat,
		audioBitrate,
		videoBitrate,
		encodingBufferSize,
		encodingMaxRate,
		everyNthFrame,
		numberOfGifLoops,
		delayRenderTimeout,
		audioCodec,
		disableWebSecurity,
		headless,
		ignoreCertificateErrors,
		openGlRenderer,
		offthreadVideoCacheSizeInBytes,
		colorSpace,
		multiProcessOnLinux,
		userAgent,
		beepOnFinish,
		repro,
	};
};
