<template>
	<div id="rest-state" class="state-content-grid">
		<text-area-component />
		<image-area-component />
		<piano-area-component />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		PianoAreaComponent,
		TextAreaComponent,
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
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['timeoutInSeconds']),
		textToDisplay() {
			if (this.hasNoContent) return '';
			else return this.textContent;
		},
		timeLimitInMiliseconds() {
			return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
		},
		timeLeftDisplay() {
			let display = '';
			const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
			const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
			if (minutes > 0) {
				display += `${minutes} minutes `;
			}
			display += `${seconds} seconds`;
			return display;
		},
	},
	methods: {
		updateFootnote() {
			const footnoteMessage = `The experiment will go to the next step in ${this.timeLeftDisplay}`;
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		startCountdown() {
			// This.timeLeftInMilliseconds = this.timeLimitInSeconds * 1000;
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

<style scoped></style>
