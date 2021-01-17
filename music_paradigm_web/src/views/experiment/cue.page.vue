<template>
	<div id="cue-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<piano-area-component class="piano-area state-section" />
		<keyboard-area-component class="piano-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,
		TextAreaComponent,
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
		...mapGetters('experiment', ['midiName']),
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

<style scoped>
.text-area {
	flex-grow: 1;
	height: 30%;
}

.image-area {
	flex-grow: 1;
	height: 50%;
}

.piano-area {
	flex-grow: 1;
	height: 50%;
}
</style>
