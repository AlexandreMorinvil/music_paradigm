<template>
	<div style="display: none"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			MIN_OCTAVE: 0,
			MAX_OCTAVE: 8,
			currentOctave: 0,
			currentNote: 0,
			BEEP_PERIOD_MILLISECONDS: 2000,
			repeaterUniqueID: 0,
			isRepeaterTurnedOn: false,
			playingNote: null,
			instrument: null,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['isSoundGeneratorInitialized', 'soundGeneratorInstrument']),
	},
	methods: {
		makeSound(midiNumber) {
			if (this.playingNote) this.playingNote.stop();
			if (this.isSoundGeneratorInitialized) this.playingNote = this.instrument.play(midiNumber, 0, { gain: 1 });
		},
		stopSound() {
			if (this.playingNote) this.playingNote.stop();
			this.playingNote = null;
		},
		makeBeep(midiNumber) {
			this.makeSound(midiNumber);
			setTimeout(() => this.stopSound(midiNumber), this.BEEP_PERIOD_MILLISECONDS / 2);
		},
		playOctaveInLoop(octave) {
			if (!this.isRepeaterTurnedOn) {
				this.currentOctave = this.getOctave(octave);
				this.repeaterUniqueID = setInterval(() => {
					const NOTE_PER_OCTAVE = 12;
					this.makeBeep(this.currentOctave * NOTE_PER_OCTAVE + this.currentNote);
					this.currentNote = (this.currentNote + 1) % NOTE_PER_OCTAVE;
				}, this.BEEP_PERIOD_MILLISECONDS);
				this.isRepeaterTurnedOn = true;
			}
		},
		playNoteInLoop(note) {
			if (!this.isRepeaterTurnedOn) {
				this.currentNote = note;
				this.makeBeep(this.currentNote);
				this.repeaterUniqueID = setInterval(() => {
					this.makeBeep(this.currentNote);
				}, this.BEEP_PERIOD_MILLISECONDS);
				this.isRepeaterTurnedOn = true;
			}
		},
		stopNoteLoop() {
			clearInterval(this.repeaterUniqueID);
			this.isRepeaterTurnedOn = false;
		},
		getOctave(octave) {
			if (octave < this.MIN_OCTAVE) return this.MIN_OCTAVE;
			else if (octave > this.MAX_OCTAVE) return this.MAX_OCTAVE;
			else return octave || 0;
		},
	},
	beforeMount() {
		this.instrument = this.soundGeneratorInstrument;
	},
	beforeDestroy() {
		this.stopNoteLoop();
		this.stopSound();
	},
	watch: {
		soundGeneratorInstrument: {
			deep: true,
			immediate: true,
			handler: function (pianoObject) {
				this.instrument = pianoObject;
			},
		},
	},
};
</script>

<style></style>
