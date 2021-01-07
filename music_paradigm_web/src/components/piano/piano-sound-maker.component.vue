<template>
	<div style="display: none"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			BEEP_PERIOD_MILLISECONDS: 2000,
			repeaterUniqueID: 0,
			isRepeaterTurnedOn: false,
			playingNote: null,
		};
	},
	computed: {
		...mapGetters('piano', ['isPianoInitialized', 'piano']),
	},
	methods: {
		makeSound(midiNumber) {
			if (this.playingNote) this.playingNote.stop();
			if (this.isPianoInitialized)
				this.playingNote = this.piano.play(midiNumber, 0, {
					gain: (vel) => {
						return vel / 127;
					},
				});
		},
		stopSound() {
			if (this.playingNote) this.playingNote.stop();
			this.playingNote = null;
		},
		makeBeep(midiNumber) {
			this.makeSound(midiNumber);
			setTimeout(() => this.stopSound(midiNumber), this.BEEP_PERIOD_MILLISECONDS / 2);
		},
		playNoteInLoop(midiNumber) {
			if (!this.isRepeaterTurnedOn)
				this.repeaterUniqueID = setInterval(() => {
					this.makeBeep(midiNumber);
				}, this.BEEP_PERIOD_MILLISECONDS);
			this.isRepeaterTurnedOn = true;
		},
	},
	beforeDestroy() {
		clearInterval(this.repeaterUniqueID);
	},
};
</script>

<style></style>
