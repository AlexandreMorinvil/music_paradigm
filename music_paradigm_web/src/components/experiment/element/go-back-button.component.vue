<template>
	<button v-on:click="emitGoBackSignal">{{ buttonMessage }}</button>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

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
	font-size: calc(0.6vh + 0.6vw);
	background-color: rgb(200, 200, 200);
	border: 3px solid rgb(185, 185, 185);
	padding-top: auto;
	margin: 10px;
}
</style>
