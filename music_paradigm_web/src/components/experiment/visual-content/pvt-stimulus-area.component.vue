<template>
	<div id="pvt-stimulus" class="state-division-text state-section">
		<center-element-component v-if="showsCentralElement" />
		<too-early-text-component v-if="hasReceivedInputTooEarly" />
		<count-up-component v-on:pvtReacted="handleReactionTime" v-if="hasRevealedStimulus" ref="countUp" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import CenterElementComponent from '@/components/experiment/pvt/center-element.component.vue';
import CountUpComponent from '@/components/experiment/pvt/count-up.component.vue';
import TooEarlyTextComponent from '@/components/experiment/pvt/too-early-text.component.vue';

export default {
	components: {
		CenterElementComponent,
		CountUpComponent,
		TooEarlyTextComponent,
	},
	data() {
		return {
			// Initialization information
			isFirstTime: true,

			// Information to manage the sequence of events

			hasRevealedStimulus: false,
			hasReceivedInput: false,
			wasStopedByTimeLimit: false,

			// Information of the interaction
			stimulusTime: null,
			inputTime: null,
			reactionTime: null,

			// Helper information
			referenceTime: new Date().getTime(),
			stimulusTimeout: null,
		};
	},
	computed: {
		...mapGetters('experiment', ['pvtHasCentralElement', 'pvtMinTime', 'pvtMaxTime', 'pvtCount']),
		showsCentralElement() {
			return !this.hasRevealedStimulus && !this.hasReceivedInput && this.pvtHasCentralElement;
		},
		hasReceivedInputTooEarly() {
			return !this.hasRevealedStimulus && this.hasReceivedInput;
		},
		showsCountUp() {
			return this.hasRevealedStimulus && !this.hasReceivedInputTooEarly;
		},
	},
	methods: {
		restart() {
			this.isFirstTime = false;

			this.hasRevealedStimulus = false;
			this.hasReceivedInput = false;

			this.stimulusTime = null;
			this.inputTime = null;
			this.reactionTime = null;

			this.referenceTime = new Date().getTime();
			this.stimulusTimeout = null;

			this.revealStimulusAfterDelay();
		},
		generateRandomStimulus() {
			return Math.floor(Math.random() * (this.pvtMaxTime - this.pvtMinTime + 1)) + this.pvtMinTime;
		},
		revealStimulusAfterDelay() {
			this.stimulusTime = this.generateRandomStimulus();
			this.referenceTime = new Date().getTime();
			this.stimulusTimeout = setTimeout(() => {
				this.hasRevealedStimulus = true;
			}, this.stimulusTime);
		},
		abortStimulus() {
			clearTimeout(this.stimulusTimeout);
		},
		handleUserInput() {
			// If the input was already received for the stimulus, we don't do any handling
			if (this.hasReceivedInput) return;
			this.hasReceivedInput = true;

			// Handle the input
			this.inputTime = new Date().getTime() - this.referenceTime;
			if (this.hasRevealedStimulus) this.$refs.countUp.stopTimer();
			this.$emit('pvtMoveOn', this.bundleResult());
		},
		handleReactionTime(reactionTime) {
			this.reactionTime = reactionTime;
		},
		bundleResult() {
			return {
				stimulusTime: this.stimulusTime,
				inputTime: this.inputTime,
				isTooEarly: this.hasReceivedInputTooEarly,
				reactionTime: this.reactionTime,
			};
		},
	},
	mounted() {
		this.revealStimulusAfterDelay();
	},
	watch: {
		hasReceivedInputTooEarly(isTooEarly) {
			if (isTooEarly) this.abortStimulus();
		},
	},
};
</script>

<style scoped>
.state-section {
	background-color: rgb(39, 39, 39);
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.image-area {
	flex-grow: 1;
}
</style>
