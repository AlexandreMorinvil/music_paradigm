<template>
	<div id="playing-rythm-area" class="playing-area">
		<div id="playing-progress-bar" class="playing-progress-bar-area">
			<progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
		</div>
	</div>
</template>

<script>
import '@/styles/playing-template.css';
import { mapGetters } from 'vuex';

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
