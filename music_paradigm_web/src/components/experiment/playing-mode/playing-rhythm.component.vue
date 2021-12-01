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

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			timeLimitUniqueIdentifier: 0,
			hasPlayedAllNotes: false,
			lasPressedMidiNotes: [],
		};
	},
	computed: {
		...mapGetters(['urlExperimentResource']),
		...mapGetters('experiment', [
			'timeoutInSeconds',
			'strictPlay',
			'relativeRhythmImportance',
			'rhythmErrorMarginInMilliseconds',
			'rhythmRelativeErrorMarginInFloat',
		]),
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
			let footnoteMessage = this.$t('experiment.playing-mode.accuracy.footnote-after-performance');
			if (this.timeoutInSeconds > 0) {
				const seconds = this.timeoutInSeconds;
				footnoteMessage = this.$tc('experiment.playing-mode.accuracy.footnote-after-performance-or-time', seconds, { second: seconds });
			}
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		evaluate() {
			this.evaluateRhythmType({
				relativeRhythmImportance: this.relativeRhythmImportance,
				rhythmErrorMarginInMilliseconds: this.rhythmErrorMarginInMilliseconds,
				rhythmRelativeErrorMarginInFloat: this.rhythmRelativeErrorMarginInFloat,
			});
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
		playedNotesMidi: {
			deep: true,
			handler: function () {
				if (!this.strictPlay) return;
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
