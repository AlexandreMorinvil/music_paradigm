<template>
	<button v-on:click="emitSkipSignal">{{ buttonMessage }}</button>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiment', ['skipStepButton', 'skipStepButtonMessage']),
		skipStepButtonValue() {
			return this.skipStepButton.toUpperCase();
		},
		buttonMessage() {
			const button = this.skipStepButtonValue;
			if (!this.skipStepButtonMessage) return this.$t('experiment.element.skip-button.default-message', { button: button });
			return this.skipStepButtonMessage;
		},
	},
	methods: {
		emitSkipSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_SKIP_REQUET);
		},
		verifySkipButton(event) {
			if (event.key.toUpperCase() === this.skipStepButtonValue) this.emitSkipSignal();
		},
	},
	mounted() {
		window.addEventListener('keydown', this.verifySkipButton);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.verifySkipButton);
	},
};
</script>

<style scoped>
button {
	font-size: calc(0.6vh + 0.6vw);
	background-color: rgb(200, 200, 200);
	border: 3px solid rgb(185, 185, 185);
	padding-top: auto;
	margin: 10px;
}
</style>
