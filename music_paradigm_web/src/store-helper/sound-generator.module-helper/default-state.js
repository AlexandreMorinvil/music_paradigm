const FIRST_AUDIO_RESSOURCE_NAME = 'audio-1';
const SECOND_AUDIO_RESSOURCE_NAME = 'audio-2';

function EMPTY_RESSOURCE_STATE() {
	return {
		// Loading information
		isLoading: false,

		// Content information
		fileName: '',
		arrayStream: null,
		processedContent: null,
	};
}

function DEFAULT_SOUND_GENERATOR_STATE() {
	const defaultState = {
		isInitialized: false,
		audioContext: null,
		instrument: null,
	};
	defaultState[FIRST_AUDIO_RESSOURCE_NAME] = EMPTY_RESSOURCE_STATE();
	defaultState[SECOND_AUDIO_RESSOURCE_NAME] = EMPTY_RESSOURCE_STATE();
	return defaultState;
}

export default {
	FIRST_AUDIO_RESSOURCE_NAME,
	SECOND_AUDIO_RESSOURCE_NAME,
	EMPTY_RESSOURCE_STATE,
	DEFAULT_SOUND_GENERATOR_STATE,
};
