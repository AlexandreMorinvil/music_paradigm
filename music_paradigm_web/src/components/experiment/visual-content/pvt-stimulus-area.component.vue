<template>
	<div id="pvt-stimulus" class="state-division-text state-section">
		<center-element-component v-if="showsCentralElement" />
		<too-early-text-component v-if="hasReceivedInputTooEarly" />
		<count-up-component v-if="hasRevealedStimulus" ref="countUp" />
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
			stimulusTime: 0,
			inputTime: 0,
			reactionTime: 0,
			isTooEarly: false,

			// Helper information
			referenceTime: new Date(),
			stimulusTimeout: null,
		};
	},
	computed: {
		...mapGetters('experiment', ['pvtHasCentralElement', 'pvtMinTime', 'pvtMaxTime', 'pvtCount']),
		showsCentralElement() {
			return !this.hasRevealedStimulus && this.pvtHasCentralElement;
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

			this.stimulusTime = 0;
			this.inputTime = 0;
			this.reactionTime = 0;
			this.isTooEarly = false;

			this.referenceTime = new Date();
			this.stimulusTimeout = null;
		},
		generateRandomStimulus() {
			return Math.floor(Math.random() * (this.pvtMaxTime - this.pvtMinTime + 1)) + this.pvtMinTime;
		},
		revealStimulusAfterDelay() {
			this.stimulusTime = this.generateRandomStimulus();
			this.referenceTime = new Date();
			this.stimulusTimeout = setTimeout(() => {
				this.hasRevealedStimulus = true;
			}, this.stimulusTime);
		},
		abortStimulus() {
			clearTimeout(this.stimulusTimeout);
		},
		handleUserInput() {
			if (this.hasReceivedInput) return;
			this.hasReceivedInput = true;
			if (this.hasRevealedStimulus) {
				this.$refs.countUp.stopTimer();
			}
		},
		// bundleResult() {
		// 	return {
		// 		stimulusTime: this.stimulusTime,
		// 		inputTime: this.inputTime,
		// 		reactionTime: this.reactionTime,
		// 		isTooEarly: this.isTooEarly,
		// 	};
		// },
	},
	mounted() {
		this.revealStimulusAfterDelay();
	},
	watch: {
		hasReceivedInputTooEarly(isTooEarly) {
			if (isTooEarly) this.abortStimulus();
		}
	}
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
