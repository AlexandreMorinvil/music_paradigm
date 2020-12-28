<template>
	<div id="video-state" class="experiment-state-container grid-area-area-note" :class="gridClass">
		<div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">
			{{ textContent }}
		</div>

		<div id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<div class="visual-media-board">
				<div class="video-box">
					<div v-show="!isPlaying" class="video-hidding-thumbnail" :style="videoWidthCSSvariable + ';' + videoHeightCSSvariable">
						{{ videoWaitingMessage }}
					</div>
					<video-player
						v-if="hasVideo"
						v-show="isPlaying"
						:src="urlExperimentRessource(videoName)"
						:dimension="videoDimensions"
						:playBack="playBack"
						v-on:finishedPlayback="handdleEndOfVideo"
						ref="video"
					/>
				</div>
				<div class="piano-box" v-if="hasInteractivePiano" :style="videoWidthCSSvariable">
					<visual-piano />
				</div>
			</div>
		</div>

		<div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">
			{{ footnote }}
		</div>
	</div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import VideoPlayer from '@/components/experiment/video/video-player.component.vue';
import VisualPiano from '@/components/piano/piano-visual-display.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		visualPiano: VisualPiano,
		VideoPlayer: VideoPlayer,
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return '';
			},
		},
	},
	data() {
		return {
			counterUniqueIdentifier: 0,
			errorAutomaticTransitionSeconds: 5,
			// Video dimensions variable
			defaultVideoHeight: 253,
			defaultVideoWidth: 480,
			// Delay before playback variables
			referenceTime: 0,
			playbackDelayInSeconds: 3,
			delayLeftInMilliseconds: 5000,
			timeStepInMilliseconds: 200,
			// Delay after playback variable
			endOfStatedelayInMilliseconds: 2000,
			// Playback variables
			isPlaying: false,
			playBack: {
				startTime: 0,
				endTime: 0,
			},
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['hasInteractivePiano', 'hasText', 'hasFootnote', 'textContent', 'videoName', 'footnoteMessage']),
		gridClass() {
			if (this.hasFootnote) {
				if (this.hasText) return 'grid-small-area-big-area-note';
				else return 'grid-area-note';
			} else if (this.hasText) return 'grid-small-area-big-area';
			else return 'grid-single-area';
		},
		footnote() {
			if (this.footnoteMessage) return this.footnoteMessage;
			let noteMessage = '';
			if (!this.hasVideo)
				noteMessage = `There is no video to be played, the experiment will automatically  go to the next step in ${this.errorAutomaticTransitionSeconds} seconds`;
			else return 'The experiment will automatically go to the next step after the video playback';

			return noteMessage;
		},
		hasVideo() {
			return this.videoName !== '';
		},
		videoDimensions() {
			let height = this.defaultVideoHeight;
			let width = this.defaultVideoWidth;
			if (this.hasInteractivePiano) {
				height *= 1.5;
				width *= 1.5;
			} else {
				height *= 2;
				width *= 2;
			}
			return {
				height: height,
				width: width,
			};
		},
		videoHeightCSSvariable() {
			return '--videoHeight: ' + this.videoDimensions.height + 'px;';
		},
		videoWidthCSSvariable() {
			return '--videoWidth: ' + this.videoDimensions.width + 'px;';
		},
		delayLeftDisplay() {
			let display = '';
			const minutes = Math.floor((this.delayLeftInMilliseconds / (60 * 1000)) % 60);
			const seconds = Math.floor((this.delayLeftInMilliseconds / 1000) % 60);
			if (minutes > 0) {
				display += `${minutes} minutes `;
			}
			display += `${seconds} seconds`;
			return display;
		},
		videoWaitingMessage() {
			if (this.videoName === '') return 'There is no video to be played';
			else return `The video will start in ${this.delayLeftDisplay}`;
		},
	},
	methods: {
		handdleEndOfVideo() {
			setTimeout(() => {
				ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
			}, this.endOfStatedelayInMilliseconds);
		},
		startDelayCountdown() {
			this.delayLeftInMilliseconds = this.playbackDelayInSeconds * 1000;
			this.referenceTime = Date.parse(new Date());
			this.counterUniqueIdentifier = window.setInterval(this.countdown, this.timeStepInMilliseconds);
		},
		countdown() {
			this.delayLeftInMilliseconds = Math.max(this.playbackDelayInSeconds * 1000 - (Date.now() - this.referenceTime), 0);
		},
		manageHavingNoVideo() {
			setTimeout(() => {
				ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
			}, this.errorAutomaticTransitionSeconds * 1000);
		},
		startVideo() {
			this.isPlaying = true;
			this.$refs.video.playerPlay();
		},
	},
	mounted() {
		if (this.videoName === '') this.manageHavingNoVideo();
		else this.startDelayCountdown();
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		delayLeftInMilliseconds(value) {
			// When the delay is over, we start the video
			if (value <= 0) {
				window.clearInterval(this.counterUniqueIdentifier);
				this.startVideo();
			}
		},
	},
};
</script>

<style scoped>
.visual-media-board {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}
.video-box {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80%;
	width: 100%;
}
.piano-box {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20%;
	width: calc(var(--videoWidth) * 1.1);
}
.video-hidding-thumbnail {
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: radial-gradient(rgb(50, 50, 50), black);
	height: var(--videoHeight);
	width: var(--videoWidth);
}
</style>
