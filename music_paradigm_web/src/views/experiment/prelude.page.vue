<template>
	<div id="prelude-state">
		<div id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('piano', ['isPianoInitialized']),
		textToDisplay() {
			if (!this.isPianoInitialized) return 'Loading...';
			else return 'Ready';
		},
	},
	watch: {
		isPianoInitialized: {
			immediate: true,
			handler: function (isReady) {
				if (isReady) ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_READY);
			},
		},
	},
};
</script>

<style scoped></style>
