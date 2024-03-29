<template>
	<div id="rest-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<clicker-area-component class="virtual-controller-area state-section" />
		<piano-area-component class="virtual-controller-area state-section" />
		<keyboard-area-component class="virtual-controller-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

import ClickerAreaComponent from '@/components/experiment/visual-content/clicker-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		TextAreaComponent,
		ClickerAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,
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
			defaultTimeLimitInSeconds: 15, // Default time limit if no time is specified in the experiment
			counterUniqueIdentifier: 0, // Unique Identifier of the countdown used for clean up
			timeLeftInMilliseconds: 0, // Time left to the countdown
			timeStepInMilliseconds: 500, // Timesteps of the countdown in miliseconds
		};
	},
	computed: {
		...mapGetters('experiment', ['timeoutInSeconds']),
		timeLimitInMiliseconds() {
			return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
		},
		timeLeftDisplay() {
			let display = '';
			const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
			const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
			if (minutes > 0) {
				display += this.$tc('views.experiment.rest.minute', minutes, { minute: minutes });
			}
			display += this.$tc('views.experiment.rest.second', seconds, { second: seconds });
			return display;
		},
	},
	methods: {
		updateFootnote() {
			const footnoteMessage = this.$t('views.experiment.rest.footnote-after-time', { time: this.timeLeftDisplay });
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		startCountdown() {
			this.referenceTime = Date.parse(new Date());
			this.counterUniqueIdentifier = window.setInterval(this.countdown, this.timeStepInMilliseconds);
		},
		countdown() {
			this.timeLeftInMilliseconds = Math.max(this.timeLimitInMiliseconds - (Date.now() - this.referenceTime), 0);
		},
	},
	mounted() {
		// Starting the countdown of the maximum time for the rest
		this.startCountdown();
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		timeLeftInMilliseconds(value) {
			this.updateFootnote();
			if (value <= 0) ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 30%;
}

.image-area {
	flex-grow: 1;
	height: 50%;
}

.virtual-controller-area {
	flex-grow: 1;
	height: 50%;
}
</style>
