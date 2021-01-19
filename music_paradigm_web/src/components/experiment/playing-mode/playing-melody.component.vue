<template>
	<div id="playing-melody-area" class="playing-area">
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
			maxInactivityALlowedInMilliSeconds: 3000,
			incativityUniqueIdentifier: 0,
			timeLimitUniqueIdentifier: 0,
			isFirstNotePressed: false,
			lasPressedMidiNotes: [],
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['timeoutInSeconds', 'melodyRepetition']),
		...mapGetters('piano', ['midiFileNotesMidi', 'pressedKeys', 'playedNotesMidi']),
		playProgress() {
			return this.playedNotesMidi.length;
		},
		maxPlayProgress() {
			return this.midiFileNotesMidi.length * this.melodyRepetition;
		},
	},
	methods: {
		...mapActions('piano', ['evaluateMelodyType']),
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
			let footnoteMessage = this.$t('experiment.playing-mode.accuracy.footnote-after-performance');
			if (this.timeoutInSeconds >= 0) {
				const seconds = this.timeoutInSeconds;
				footnoteMessage = this.$tc('experiment.playing-mode.accuracy.footnote-after-performance-or-time', seconds, { second: seconds });
			}
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		evaluate() {
			this.evaluateMelodyType(this.melodyRepetition);
		},
	},
	mounted() {
		this.updateFootnote();
		this.setTimeLimit();
	},
	destroyed() {
		window.clearTimeout(this.timeLimitUniqueIdentifier);
		window.clearTimeout(this.incativityUniqueIdentifier);
	},
	watch: {
		playedNotesMidi: {
			deep: true,
			handler: function () {
				window.clearTimeout(this.incativityUniqueIdentifier);
				this.incativityUniqueIdentifier = setTimeout(() => {
					this.$emit('finished-playing');
				}, this.maxInactivityALlowedInMilliSeconds);

				const playedNoteIndex = this.playedNotesMidi.length - 1;
				const referenceIndex = playedNoteIndex % this.midiFileNotesMidi.length;
				const hasError = this.playedNotesMidi[playedNoteIndex] !== this.midiFileNotesMidi[referenceIndex];
				if (hasError) this.$emit('finished-playing');
			},
		},
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
