<template>
	<div class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<div class="visual-media-board video-area state-section">
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
					v-on:finished-playback="handdleEndOfVideo"
					ref="video"
				/>
			</div>
		</div>
		<piano-area-component class="piano-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';
import VideoPlayer from '@/components/experiment/video/video-player.component.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		PianoAreaComponent,
		TextAreaComponent,
		// VideoAreaComponent,
		VideoPlayer,
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
		...mapGetters('experiment', ['hasVideo', 'hasInteractivePiano', 'hasText', 'videoName']),
		videoDimensions() {
			let height = this.defaultVideoHeight;
			let width = this.defaultVideoWidth;
			if (this.hasInteractivePiano) {
				height *= 1.5;
				width *= 1.5;
			} else {
				height *= 1.9;
				width *= 1.9;
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
		updateFootnote() {
			let footnoteMessage = '';
			if (!this.hasVideo)
				footnoteMessage = `There is no video to be played, the experiment will automatically  go to the next step in ${this.errorAutomaticTransitionSeconds} seconds`;
			else footnoteMessage = 'The experiment will automatically go to the next step after the video playback';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
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
	beforeMount() {
		this.updateFootnote();
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
.video-hidding-thumbnail {
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: radial-gradient(rgb(50, 50, 50), black);
	height: var(--videoHeight);
	width: var(--videoWidth);
}

.text-area {
	flex-grow: 1;
}

.video-area {
	flex-grow: 5;
}

.piano-area {
	flex-grow: 1;
}
</style>
