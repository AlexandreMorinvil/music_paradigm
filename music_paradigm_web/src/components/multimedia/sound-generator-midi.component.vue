<template>
	<div style="display: none" />
</template>

<script>
import { mapGetters } from 'vuex';
import { midiConversion } from '@/_helpers';

import * as Tone from 'tone';

export default {
	data() {
		return {
			VOLUME_LEVEL: 0.05,
			numberNotesTriggered: 0,
			numberNotesReleased: 0,
			totalNumberNotes: 0,
			audioNodes: {},
			toneTransport: null,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['soundGeneratorAudioContext', 'soundGeneratorInstrument']),
		isPlaying() {
			if (this.totalNumberNotes <= 0) return false;
			else if (this.numberNotesTriggered < this.totalNumberNotes) return true;
			else if (this.numberNotesReleased < this.totalNumberNotes) return true;
			else return false;
		},
	},
	methods: {
		incrementTiggeredNotesNumber() {
			this.numberNotesTriggered += 1;
		},
		incrementReeasedNotesNumber() {
			this.numberNotesReleased += 1;
		},
		play(parsedMidiNotes) {
			this.stop();
			this.totalNumberNotes = parsedMidiNotes.length;
			this.numberNotesTriggered = 0;
			this.numberNotesReleased = 0;

			if (!parsedMidiNotes || parsedMidiNotes.length <= 0) return;

			Tone.Transport.scheduleOnce((schedulerNow) => {
				// The current time of ToneJs (used for synchronizing the events with the notes) and the audio
				// corrent time of the audio context of soundfont-player (used to play an  instrument) are not
				// the same. Therefore, we have a separete 'schedulerNow' and 'playerNow'
				const playerNow = this.soundGeneratorAudioContext.currentTime;

				// Schedule the time to play each
				parsedMidiNotes.forEach((note) => {
					// Generate name if no name was provided
					const noteName = note.name || midiConversion.midiNumberToName(note.midi);
					const noteDuration = note.duration || 1;
					const noteVelocity = note.velocity || 1;

					// Note playing scheduler
					const audioNode = this.soundGeneratorInstrument.play(noteName, playerNow + note.time, {
						gain: noteVelocity,
						duration: noteDuration,
					});
					this.audioNodes[note.midi] = audioNode;

					// Indicate that the note started playing
					Tone.Draw.schedule(() => this.incrementTiggeredNotesNumber(), schedulerNow + note.time);

					// Indicate that the note stopped playing
					Tone.Draw.schedule(() => this.incrementReeasedNotesNumber(), schedulerNow + note.time + noteDuration);
				});
			});

			Tone.Transport.start();
		},
		stop() {
			for (const note in this.audioNodes) this.audioNodes[note].stop();
			this.audioNodes = {};
		},
	},
	mounted() {
		Tone.start();
	},
	beforeDestroy() {
		Tone.Transport.stop();
		this.stop();
	},
	watch: {
		numberNotesReleased: {
			deep: true,
			handler: function () {
				if (this.numberNotesReleased === 0) return;
				else if (this.numberNotesReleased === this.totalNumberNotes) {
					Tone.Transport.stop();
					this.$emit('finished');
				}
			},
		},
	},
};
</script>

<style scoped></style>
