<template>
	<button v-on:click="emitGoBackSignal" class="footnote-button">{{ buttonMessage }}</button>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	computed: {
		...mapGetters('experiment', ['goBackStepButton', 'goBackButtonMessage']),
		goBackStepButtonValue() {
			return this.goBackStepButton.toUpperCase();
		},
		buttonMessage() {
			const button = this.goBackStepButtonValue;
			if (!this.goBackButtonMessage) return this.$t('experiment.element.go-back-button.default-message', { button: button });
			return this.goBackButtonMessage;
		},
	},
	methods: {
		emitGoBackSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_GO_BACK_REQUET);
		},
		verifyGoBackButton(event) {
			if (event.key.toUpperCase() === this.goBackStepButtonValue) this.emitGoBackSignal();
		},
	},
	mounted() {
		window.addEventListener('keydown', this.verifyGoBackButton);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.verifyGoBackButton);
	},
};
</script>

<style scoped>
button {
	padding-top: auto;
}
</style>
