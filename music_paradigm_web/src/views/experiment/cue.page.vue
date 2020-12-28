<template>
	<div id="cue-state" class="experiment-state-container" :class="gridClass">
		<div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>

		<div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<visual-piano v-if="hasInteractivePiano" />
			<img id="cue-img" v-else :src="urlExperimentRessource(pictureName)" alt="Cue" />
		</div>
	</div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import VisualPiano from '@/components/piano/piano-visual-display.component.vue';

export default {
	components: {
		visualPiano: VisualPiano,
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return '';
			},
		},
	},
	data() {
		return {
			errorAutomaticTransitionSeconds: 5,
			playbackDelayInSeconds: 1,
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['isMidiFileLoaded']),
		...mapGetters('experiment', [
			'midiName',
			'hasNoContent',
			'hasInteractivePiano',
			'hasText',
			'hasVisualMedia',
			'pictureName',
			'textContent',
			'hasFootnote',
		]),
		gridClass() {
			if (this.hasFootnote) {
				if (this.hasText && this.hasVisualMedia) return 'grid-area-big-area-note';
				else return 'grid-area-note';
			} else if (this.hasText && this.hasVisualMedia) return 'grid-area-big-area';
			else return 'grid-single-area';
		},
		textToDisplay() {
			if (this.hasNoContent) return 'Cue';
			else return this.textContent;
		},
	},
	methods: {
		...mapActions('piano', ['playMidiFile', 'addPlayerEndOfFileAction', 'removePlayerEndOfFileAction']),
		updateFootnote() {
			let footnoteMessage = '';
			if (!this.midiName)
				footnoteMessage = `There is no melody to be played, the experiment will automatically  go to the next step in ${this.errorAutomaticTransitionSeconds} seconds`;
			else footnoteMessage = 'The experiment will automatically go to the next step after the muscial cue';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handleEndOfMidiFile() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		manageHavingNoMidiFile() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
	},
	beforeDestroy() {
		this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
	},
	watch: {
		isMidiFileLoaded: {
			immediate: true,
			handler: function (isReady) {
				if (isReady) setTimeout(() => this.playMidiFile(), this.playbackDelayInSeconds * 1000);
				else if (this.midiName === '') setTimeout(() => this.manageHavingNoMidiFile(), this.errorAutomaticTransitionSeconds * 1000);
			},
		},
	},
};
</script>

<style scoped></style>
