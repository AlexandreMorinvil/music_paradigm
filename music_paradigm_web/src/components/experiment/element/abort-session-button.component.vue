<template>
	<button v-on:click="emitSkipSignal" class="task-button">{{ buttonMessage }}</button>
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
		...mapGetters('experiment', ['abortSessionButton', 'abortSessionButtonMessage']),
		abortSessionButtonValue() {
			return this.abortSessionButton.toUpperCase();
		},
		buttonMessage() {
			const button = this.abortSessionButtonValue;
			if (!this.abortSessionButtonMessage) return this.$t('experiment.element.skip-button.default-message', { button: button });
			return this.abortSessionButtonMessage;
		},
	},
	methods: {
		emitSkipSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_SESSION_ABORTED);
		},
		verifySkipButton(event) {
			if (event.key.toUpperCase() === this.abortSessionButtonValue) this.emitSkipSignal();
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
