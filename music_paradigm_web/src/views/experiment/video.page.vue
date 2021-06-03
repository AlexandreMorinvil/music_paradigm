<template>
	<div class="state-content-flex">
		<text-area-component class="text-area state-section" />

		<div class="video-box video-area">
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

		<piano-area-component class="piano-area state-section" />
		<keyboard-area-component class="piano-area state-section" />
	</div>
</template>

<script>
// TODO: This needs refactoring
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';

import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';
import VideoPlayer from '@/components/experiment/video/video-player.component.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		KeyboardAreaComponent,
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
			playbackDelayInSeconds: 2,
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
			const seconds = Math.floor((this.delayLeftInMilliseconds / 1000) % 60) + 1;
			if (minutes > 0) {
				display += this.$tc('views.experiment.video.minute', minutes, { minute: minutes });
			}
			display += this.$tc('views.experiment.video.second', seconds, { second: seconds });
			return display;
		},
		videoWaitingMessage() {
			if (this.videoName === '') return this.$t('views.experiment.video.no-video');
			else return this.$t('views.experiment.video.video-countdown', { time: this.delayLeftDisplay });
		},
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			const secondsLeft = this.errorAutomaticTransitionSeconds;
			if (!this.hasVideo) footnoteMessage = this.$tc('views.experiment.video.footnote-no-video', secondsLeft, { second: secondsLeft });
			else footnoteMessage = this.$t('views.experiment.video.footnote-after-video');
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
.video-box {
	display: flex;
	justify-content: center;
	align-items: center;
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
	height: 10%;
}

.video-area {
	flex-grow: 1;
	margin-bottom: 5%;
}

.piano-area {
	flex-grow: 1;
}
</style>
