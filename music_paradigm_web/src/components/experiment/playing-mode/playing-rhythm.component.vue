<template>
	<div id="playing-rythm-area" class="playing-area">
		<div id="playing-progress-bar" class="playing-progress-bar-area">
			<progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
		</div>
	</div>
</template>

<script>
import '@/styles/playing-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

export default {
	data() {
		return {
			timeLimitUniqueIdentifier: 0,
			hasPlayedAllNotes: false,
			lasPressedMidiNotes: [],
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['timeoutInSeconds']),
		...mapGetters('piano', ['midiFileNotesMidi', 'playedNotesMidi', 'pressedKeys']),
		playProgress() {
			return this.playedNotesMidi.length;
		},
		maxPlayProgress() {
			return this.midiFileNotesMidi.length;
		},
	},
	methods: {
		...mapActions('piano', ['evaluateRhythmType']),
		start() {
			return;
		},
		setTimeLimit() {
			if (this.timeoutInSeconds !== 0) {
				this.timeLimitUniqueIdentifier = window.setTimeout(() => {
					this.$emit('finished-playing');
				}, this.timeoutInSeconds * 1000);
			}
		},
		stopHint() {
			if (this.hasInteractivePiano) this.$refs.piano.clearDesignatedKeys();
		},
		updateFootnote() {
			let footnoteMessage = 'The experiment will go to the next step after your performance';
			if (this.timeoutInSeconds !== 0) footnoteMessage += ` or after ${this.timeoutInSeconds} seconds`;
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		evaluate() {
			this.evaluateRhythmType();
		},
	},
	mounted() {
		this.updateFootnote();
		this.setTimeLimit();
	},
	destroyed() {
		window.clearTimeout(this.timeLimitUniqueIdentifier);
	},
	watch: {
		playProgress(value) {
			if (value >= this.maxPlayProgress) {
				this.hasPlayedAllNotes = true;
				this.lasPressedMidiNotes = JSON.parse(JSON.stringify(this.playedNotesMidi));
			}
		},
		pressedKeys: {
			deep: true,
			handler: function (pressedKeys) {
				if (this.hasPlayedAllNotes) {
					const hasNewPress = (currentKeys, lastKeys) => !currentKeys.every((v) => lastKeys.includes(v));
					const wasLastPressReleased = (currentKeys, lastKeys) => !currentKeys.includes(lastKeys[lastKeys.length - 1]);

					if (wasLastPressReleased(pressedKeys, this.lasPressedMidiNotes) || hasNewPress(pressedKeys, this.lasPressedMidiNotes)) {
						this.$emit('finished-playing');
					} else {
						this.lasPressedMidiNotes = JSON.parse(JSON.stringify(pressedKeys));
					}
				}
			},
		},
	},
};
</script>

<style scoped></style>