<template>
	<button v-on:click="emitSkipSignal" class="footnote-button">{{ buttonMessage }}</button>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

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
	padding-top: auto;
}
</style>
