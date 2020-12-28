<template>
	<div id="prelude-state" class="experiment-state-container grid-area-note">
		<div id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>

		<div id="note-area" class="experiment-state-division state-division-text">
			{{ footnote }}
		</div>
	</div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import { mapGetters } from 'vuex';

export default {
	components: {},
	props: {
		isSpaceBarPressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	computed: {
		...mapGetters('piano', ['isPianoInitialized']),
		textToDisplay() {
			if (!this.isPianoInitialized) return 'Loading...';
			else return 'Ready';
		},
	},
	methods: {
		updateFootnote() {
			const footnoteMessage = 'Please wait a moment';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
	},
	beforeMount() {
		this.updateFootnote();
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
