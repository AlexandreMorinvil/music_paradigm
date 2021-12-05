import { defaultState } from '@/store-helper/sound-generator.module-helper';

export default {
	// Sound player
	isSoundGeneratorInitialized: (state) => {
		return state.isInitialized;
	},

	soundGeneratorAudioContext: (state) => {
		return state.audioContext;
	},

	soundGeneratorInstrument: (state) => {
		return state.instrument;
	},

	// First Audio
	hasAudioFirst: (state) => {
		return Boolean(state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].fileName) || state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].isLoading;
	},

	isAudioFirstLoading: (state) => {
		return state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].isLoading;
	},

	audioFirstName: (state) => {
		return state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].fileName;
	},

	audioFirstContent: (state) => {
		return state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].arrayStream;
	},

	audioFirstParsed: (state) => {
		return state[defaultState.FIRST_AUDIO_RESSOURCE_NAME].processedContent;
	},

	// Second Audio
	hasAudioSecond: (state) => {
		return Boolean(state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].fileName) || state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].isLoading;
	},

	isAudioSecondLoading: (state) => {
		return state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].isLoading;
	},

	audioSecondName: (state) => {
		return state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].fileName;
	},

	audioSecondContent: (state) => {
		return state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].arrayStream;
	},

	audioSecondParsed: (state) => {
		return state[defaultState.SECOND_AUDIO_RESSOURCE_NAME].processedContent;
	},
};
