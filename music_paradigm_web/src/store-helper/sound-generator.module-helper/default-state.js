const FIRST_RESSOURCE_NAME = 'question-audio-1';
const SECOND_RESSOURCE_NAME = 'question-audio-2';

function EMPTY_RESSOURCE_STATE() {
	return {
		fileName: '',
		extension: '',
		arrayStream: null,
		processedContent: null,
	};
}

function DEFAULT_SOUND_GENERATOR_STATE() {
	const defaultState = {};
	defaultState[FIRST_RESSOURCE_NAME] = EMPTY_RESSOURCE_STATE();
	defaultState[SECOND_RESSOURCE_NAME] = EMPTY_RESSOURCE_STATE();
	return defaultState;
}

export default {
	FIRST_RESSOURCE_NAME,
	SECOND_RESSOURCE_NAME,
	DEFAULT_SOUND_GENERATOR_STATE,
};
