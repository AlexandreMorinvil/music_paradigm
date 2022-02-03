import { Midi } from '@tonejs/midi';
import { defaultState } from '@/store-helper/sound-generator.module-helper';
import { ressourceName } from '@/_helpers';

export default {
	initializeSoundGenerator: async (state) => {
		const soundFont = require('soundfont-player');
		state.audioContext = new AudioContext();
		state.instrument = await soundFont.instrument(state.audioContext, 'acoustic_grand_piano');
		state.isInitialized = true;
	},

	terminateSoundGenerator: (state) => {
		state.isInitialized = false;
		Object.assign(state, defaultState.DEFAULT_SOUND_GENERATOR_STATE());
	},

	indicateIsLoading: (state, assignation) => {
		state[assignation].isLoading = true;
	},

	indicateIsLoadingEnd: (state, assignation) => {
		state[assignation].isLoading = false;
	},

	resetResource: (state, assignation) => {
		state[assignation] = defaultState.EMPTY_RESSOURCE_STATE();
	},

	setResourceName: (state, { assignation, fileName }) => {
		state[assignation].fileName = fileName;
	},

	loadResourceArrayStream: (state, { assignation, arrayStream }) => {
		state[assignation].arrayStream = arrayStream;
	},

	processArrayStream: (state, assignation) => {
		// If the file is a MIDI file, we parse it
		if (!ressourceName.isMidiFile(state[assignation].fileName)) return;
		const jsonMidi = new Midi(state[assignation].arrayStream);
		const notes = jsonMidi.tracks[0].notes;
		state[assignation].processedContent = notes;
	},
};
