<template>
	<div style="display: none" />
</template>

<script>
import { mapGetters } from 'vuex';
import { midiConversion } from '@/_helpers';

export default {
	data() {
		return {
			VOLUME_LEVEL: 0.05,
			numberNotesTriggered: 0,
			totalNumberNotes: 0,
			playingMidiNotes: [],
			audioNodes: {},
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['soundGeneratorAudioContext', 'soundGeneratorInstrument']),
		isPlaying() {
			const hasAllNotesBeenStarted = this.playingMidiNotes.length === this.totalNumberNotes;
			const hasAPlayingNote = this.playingMidiNotes.includes(true);
			return !hasAllNotesBeenStarted || hasAPlayingNote;
		},
	},
	methods: {
		/**
		 *	Play the midi file and keep in memory each note played
		 * 	'schedule(ac.currentTime, notes)' is not used
		 * 	This is in order to be able to add further actions when each note is played
		 */
		play(parsedMidiNotes, audioContext) {
			this.stop();
			this.playingMidiNotes = [];
			this.totalNumberNotes = parsedMidiNotes.length;
			this.numberNotesTriggered = 0;

			if (!parsedMidiNotes || parsedMidiNotes.length <= 0) return;

			const ac = audioContext || this.soundGeneratorAudioContext || new AudioContext();
			const now = ac.currentTime;

			parsedMidiNotes.forEach((note) => {
				// Generate name if no name was provided
				const name = note.name || midiConversion.midiNumberToName(note.midi);

				// Indicate that a note is playing
				const index = this.playingMidiNotes.length;
				this.playingMidiNotes[index] = false;
				const startDelay = note.time;
				setTimeout(() => {
					console.log('Test', index);
					this.playingMidiNotes[index] = true;
					this.numberNotesTriggered += 1;
				}, 1000 * startDelay);

				// Play the note
				const audioNode = this.soundGeneratorInstrument.play(name, now + note.time, {
					gain: note.velocity || 1,
					duration: note.duration || 1,
				});
				this.audioNodes[note.midi] = audioNode;

				// Indicate that the note stopped playing
				const endDelay = now + note.time + (note.duration || 1) - ac.currentTime;
				setTimeout(() => {
					this.playingMidiNotes[index] = false;
				}, 1000 * endDelay);
			});
		},
		stop() {
			for (const note in this.audioNodes) this.audioNodes[note].stop();
			this.audioNodes = {};
		},
	},
	beforeDestroy() {
		this.stop();
	},
};
</script>

<style scoped></style>
