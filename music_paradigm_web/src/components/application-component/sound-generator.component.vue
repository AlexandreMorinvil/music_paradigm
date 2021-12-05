<template>
	<div style="display: none" />
</template>

<script>
import * as Tone from 'tone';
import { mapActions, mapGetters } from 'vuex';

import { midiConversion } from '@/_helpers';

export default {
	data() {
		return {
			MAX_VELOCITY: 127,
		};
	},
	computed: {
		...mapGetters('soundGenerator', ['soundGeneratorAudioContext', 'soundGeneratorInstrument']),
	},
	methods: {
		// ...mapActions('soundGenerator', ['loadQuestionFirstAudio', 'loadQuestionSecondAudio']),
		test() {
			const soundfont = require('soundfont-player');
			const audioContext = new AudioContext();
			soundfont.instrument(audioContext, 'acoustic_grand_piano').then(function (piano) {
				piano.play('C4');
				piano.schedule(audioContext.currentTime, [
					{ time: 0, note: 60 },
					{ time: 0.5, note: 61 },
				]);
			});
		},
		playMidiNotes(parsedMidiNotes, audioContext) {
			if (!parsedMidiNotes || !parsedMidiNotes.length) return;
			const ac = audioContext || this.soundGeneratorAudioContext || new AudioContext();
			this.soundGeneratorInstrument.schedule(ac.currentTime, parsedMidiNotes);
		},
		playMidiNotes2(parsedMidiNotes, audioContext) {
			console.log('Test');
			if (!parsedMidiNotes || !parsedMidiNotes.length) return;
			const ac = audioContext || this.soundGeneratorAudioContext || new AudioContext();
			const now = ac.currentTime;
			parsedMidiNotes.forEach((note, index) => {
				const name = note.name || midiConversion.midiNumberToName(note.midi);
				console.log('Got here');
				this.soundGeneratorInstrument.play(name, now + note.time, {
					gain: (note.velocity || this.MAX_VELOCITY) / this.MAX_VELOCITY,
					duration: note.duration,
				});
			});
		},
		// playMidiFile(parsedMidiFile) {
		// 	this.piano.play(noteName, currentTime, {
		// 		gain: velocity / this.MAX_VELOCITY,
		// 		duration: 1,
		// 	});
		// },
		// playMidiFile() {
		// 	const now = Tone.now() + 0.5;
		// 	const currentTime = this.audioConctext.currentTime + 0.5;

		// 	notes.forEach((note) => {
		// 		synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
		// 		this.piano.play(noteName, currentTime, {
		// 			gain: velocity / this.MAX_VELOCITY,
		// 			duration: 1,
		// 		});
		// 	});
		// },
	},
	// beforeMount() {},
	mounted() {
		// this.test();
		this.playMidiNotes2([
			{ time: 0.0, midi: 60, duration: 1 },
			{ time: 0.5, midi: 61, duration: 1 },
			{ time: 1.0, midi: 62, duration: 1 },
			{ time: 1.5, midi: 63, duration: 1 },
			{ time: 2.0, midi: 64, duration: 1 },
			{ time: 2.5, midi: 65, duration: 1 },
		]);
	},
	// 	beforeDestroy() {},
};
</script>

<style scoped></style>
