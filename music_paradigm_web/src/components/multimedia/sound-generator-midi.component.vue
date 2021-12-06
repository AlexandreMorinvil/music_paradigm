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
			MAX_VELOCITY: 127,
			totalNumberNotes: [],
			playedMidiNotes: [],
			audioNodes: [],
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['soundGeneratorAudioContext', 'soundGeneratorInstrument']),
		numberNotesPlayed() {
			return this.playedMidiNotes.length;
		}
	},
	methods: {
		/**
		 *	Play the midi file and keep in memory each note played
		 * 	'schedule(ac.currentTime, notes)' is not used
		 * 	This is in order to be able to add further actions when each note is played
		 */
		play(parsedMidiNotes, audioContext) {
			if (!parsedMidiNotes || parsedMidiNotes.length <= 0) return;

			this.stop();
			this.playedMidiNotes = [];
			this.totalNumberNotes = parsedMidiNotes.length;

			const ac = audioContext || this.soundGeneratorAudioContext || new AudioContext();
			const now = ac.currentTime;

			parsedMidiNotes.forEach((note) => {
				// Generate name if no name was provided
				const name = note.name || midiConversion.midiNumberToName(note.midi);

				// Indicate that a note is playing
				const index = this.playedMidiNotes.length;
				this.playedMidiNotes[index] = true;

				// Play the note
				const audioNode = this.soundGeneratorInstrument.play(name, now + note.time, {
					gain: (note.velocity || this.MAX_VELOCITY) / this.MAX_VELOCITY,
					duration: note.duration || 1,
				});
				this.audioNodes[note.midi] = audioNode;

				// Indicate that the note stopped playing
				const endDelay = now + note.time + (note.duration || 1) - ac.currentTime;
				setTimeout(() => {
					this.playedMidiNotes[index] = false;
				}, 1000 * endDelay);
			});
		},
		stop() {
			for (const note in this.audioNodes) this.audioNodes[note].stop();
			this.audioNodes = [];
		},
	},
	beforeDestroy() {
		this.stop();
	},
};
</script>

<style scoped></style>
