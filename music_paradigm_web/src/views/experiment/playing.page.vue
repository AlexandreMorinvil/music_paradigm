<template>
	<div id="playing-state" class="standard-state-content-grid" :class="gridClass">
		<div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">
			{{ textContent }}
		</div>

		<div id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<component :is="playingMode" v-on:finishedPlaying="handdleEndOfPlaying" ref="playingMode" />
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import { mapActions, mapGetters } from 'vuex';

import PlayingMelodyComponent from '@/components/experiment/playing-mode/playing-melody.component';
import PlayingRhythmComponent from '@/components/experiment/playing-mode/playing-rhythm.component';
import PlayingSpeedComponent from '@/components/experiment/playing-mode/playing-speed.component';

export default {
	components: {
		speed: PlayingSpeedComponent,
		rhythm: PlayingRhythmComponent,
		melody: PlayingMelodyComponent,
	},
	data() {
		return {
			hasReceivedStartSignal: false,
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['hasSuccess']),
		...mapGetters('experiment', ['hasText', 'hasFootnote', 'textContent', 'playingMode']),
		gridClass() {
			if (this.hasText) return 'grid-small-area-big-area';
			else return 'grid-single-area';
		},
	},
	methods: {
		...mapActions('experiment', ['addSuccess']),
		...mapActions('log', ['createSimpleLog']),
		updateFootnote() {
			const footnoteMessage = 'The experiment will go to the next step after your performance';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handdleEndOfPlaying() {
			this.evaluatePlayedNotes();
			this.createSimpleLog();
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		evaluatePlayedNotes() {
			this.$refs.playingMode.evaluate();
			if (this.hasSuccess) this.addSuccess();
		},
		startPerformance() {
			this.hasReceivedStartSignal = true;
			this.$refs.playingMode.start();
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_START_SIGNAL_READY, this.startPerformance);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_START_SIGNAL_READY, this.startPerformance);
	},
};
</script>

<style scoped></style>
