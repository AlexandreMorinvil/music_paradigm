<template>
	<div id="text-area" class="state-section">
		<div>
			<button class="midi-choice">1</button>
		</div>
		<p v-if="hasSpecification" class="specification-text">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import * as Tone from 'tone';

export default {
	data() {
		return {
			piano: null,
		};
	},
	computed: {
		...mapGetters('experiment', ['textSpecification']),
		hasSpecification() {
			return Boolean(this.textSpecification);
		},
		textContent() {
			return this.textSpecification;
		},
		hasMidi() {
			return Boolean(this.textSpecification);
		},
	},
	// loadMelody() {
	// 	const pianoSamples = new Tone.ToneAudioBuffers(
	// 		{
	// 			A1: 'https://tonejs.github.io/audio/casio/A1.mp3',
	// 			A2: 'https://tonejs.github.io/audio/casio/A2.mp3',
	// 		},
	// 		() => {
	// 			const player = new Tone.Player().toDestination();
	// 			// play one of the samples when they all load
	// 			player.buffer = pianoSamples.get('A1');
	// 			player.start();
	// 		},
	// 	);
	// },
	beforeMount() {
		// const pianoSamples = new Tone.ToneAudioBuffers(
		// 	{
		// 		A1: 'https://tonejs.github.io/audio/casio/A1.mp3',
		// 		A2: 'https://tonejs.github.io/audio/casio/A2.mp3',
		// 	},
		// 	() => {
		// 		const player = new Tone.Player().toDestination();
		// 		// play one of the samples when they all load
		// 		player.buffer = pianoSamples.get('A1');
		// 		player.start();
		// 	},
		// );
	},
	mounted() {
		// // create a synth and connect it to the main output (your speakers)
		// const synth = new Tone.Synth().toDestination();

		// // play a middle 'C' for the duration of an 8th note
		// synth.triggerAttackRelease('C4', '8n');

		// // passing a single instrument name loads one instrument and returns the tone.js object
		// const piano = Tone.SampleLibrary.load({
		// 	instruments: 'piano',
		// });

		// piano.toMaster();
		// piano.triggerAttack('A3');

		// this.loadMelody();

		// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		const soundfont = require('soundfont-player');
		const audioConctext = new AudioContext();

		// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (piano) {
			piano.play('C4');
		});

		// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// const instrumentFileUrl = instruments.getInstrumentFile(this.instrument);
		// 'https://raw.githubusercontent.com/audionerd/byte-music.js/master/soundfonts/acoustic_grand_piano-ogg.js')
		soundfont
			.instrument(audioConctext, 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js')
			.then((piano) => {
				this.piano = piano;

				const sampler = new Tone.Sampler({
					urls: piano,
					release: 1,
				}).toDestination();

				Tone.loaded().then(() => {
					sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4);
				});
			});
		// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// const sampler = new Tone.Sampler({
		// 	urls: {
		// 		C4: 'C4.mp3',
		// 		'D#4': 'Ds4.mp3',
		// 		'F#4': 'Fs4.mp3',
		// 		A4: 'A4.mp3',
		// 	},
		// 	release: 1,
		// 	baseUrl: 'https://tonejs.github.io/audio/salamander/',
		// }).toDestination();

		// Tone.loaded().then(() => {
		// 	sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4);
		// });

		// // passing an array of instrument names will load all the instruments listed returning a new object,
		// // each property a tone.js object
		// const instruments = Tone.SampleLibrary.load({
		// 	instruments: ['piano', 'harmonium', 'violin'],
		// });

		// // waits for instrument sound files to load from /samples/
		// Tone.Buffer.on('load', function () {
		// 	// play instrument sound
		// 	instruments['piano'].toMaster();
		// 	instruments['piano'].triggerAttack('A3');
		// });
	},
};
</script>

<style scoped>
.specification-text {
	margin: 20px;
}

.midi-choice {
	border: none;
	width: 125px;
	height: 125px;
}

.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-direction: column;

	background-color: rgb(245, 245, 245);
}
</style>
