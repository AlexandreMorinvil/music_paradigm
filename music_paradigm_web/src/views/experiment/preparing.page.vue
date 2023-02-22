<template>
	<div id="preparing-state">
		<div id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			isIntervalStarted: false,
			repeaterUniqieID: 0,
			REPEATITION_INTERVAL: 500,
		};
	},
	computed: {
		...mapGetters('experiment', ['hasSound', 'mustInitializePianoInputHandler']),
		...mapGetters('piano', ['isPianoInitialized']),
		...mapGetters('keyboard', ['isKeyboardInitialized']),
		...mapGetters('soundGenerator', ['isSoundGeneratorInitialized']),
		textToDisplay() {
			if (!this.isReadyToStart) return this.$t('views.experiment.preparing.loading');
			else return "";
		},
		isReadyToStart() {
			let isReady = true;
			isReady &= this.isKeyboardInitialized;
			if (this.mustInitializePianoInputHandler) isReady &= this.isPianoInitialized;
			if (this.hasSound) isReady &= this.isSoundGeneratorInitialized;
			return isReady;
		},
	},
	methods: {
		sendStartSignal() {
			// This strategy of repeating the signal periodically is used in case the signal is sent too early and is not caught but the parent component at the first emition
			if (this.isIntervalStarted) return;
			this.repeaterUniqieID = setInterval(function () {
				ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_READY);
			}, this.REPEATITION_INTERVAL);
			this.isIntervalStarted = true;
		},
	},
	beforeDestroy() {
		clearInterval(this.repeaterUniqieID);
	},
	watch: {
		isReadyToStart: {
			immediate: true,
			handler: function (isReady) {
				if (isReady) this.sendStartSignal();
			},
		},
	},
};
</script>

<style scoped></style>
