import { defaultState } from '@/store-helper/experiment.module-helper';

// Getters used for the parameters that are specific to the current state
export default {
	currentStateType: (state) => {
		// Return the type of the current state
		if (state.cursor.flag.isBeyondEnd) return 'end';
		else return state.state.type || '';
	},

	currentStateSubtype: (state) => {
		const type = state.state.type;
		switch (type) {
			case 'playing': return state.state.settings.playingMode;
			case 'question': return state.state.settings.questionType;
			case 'survey': return state.state.settings.surveyType;
			default: return '';
		}
	},

	textContent: (state) => {
		return state.state.content.text;
	},

	pictureName: (state) => {
		const pictureName = state.state.content.pictureName;
		return pictureName ? `${state.description.folder}/${pictureName}` : '';
	},

	helperImageName: (state) => {
		const pictureName = state.state.content.helperImageName;
		return pictureName ? `${state.description.folder}/${pictureName}` : '';
	},

	textReminder: (state) => {
		return state.state.content.textReminder;
	},

	midiName: (state) => {
		const midiName = state.state.mediaFile.midiName;
		return midiName ? `${state.description.folder}/${midiName}` : '';
	},

	videoName: (state) => {
		const videoName = state.state.mediaFile.videoName;
		return videoName ? `${state.description.folder}/${videoName}` : '';
	},

	referenceKeyboardKeys: (state) => {
		return state.state.mediaFile.referenceKeyboardKeys;
	},

	audioFirst: (state) => {
		const fileName = state.state.mediaFile.audioFirst;
		return fileName ? `${state.description.folder}/${fileName}` : '';
	},

	audioSecond: (state) => {
		const fileName = state.state.mediaFile.audioSecond;
		return fileName ? `${state.description.folder}/${fileName}` : '';
	},

	anyPianoKey: (state) => {
		// The "anyPianoKey" parameter indicates whether the user of the experiment can move to the next step by pressing any piano key
		// (if the value is "true"), otherwise the experiment will move to the next step only by pressing the space bar key (if the value is false).
		let anyPianoKey = false;

		if (typeof state.state.settings.anyPianoKey === 'boolean') anyPianoKey = state.state.settings.anyPianoKey;
		else if (typeof state.settings.anyPianoKey === 'boolean') anyPianoKey = state.settings.anyPianoKey;
		else anyPianoKey = defaultState.DEFAULT_ANY_PIANO_KEY;

		return anyPianoKey;
	},

	enableSoundFlag: (state) => {
		// Return whether or not the piano output is enabled.
		let enableSoundFlag = defaultState.DEFAULT_ENABLE_SOUND_FLAG;

		if (state.state.type === 'playing') enableSoundFlag = true;
		else if (typeof state.state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.state.settings.enableSoundFlag;
		else if (typeof state.settings.enableSoundFlag === 'boolean') enableSoundFlag = state.settings.enableSoundFlag;

		return enableSoundFlag;
	},

	timeoutInSeconds: (state) => {
		// Return the the timeout time specified by the block if it exists, otherwise, return a value of 0 to be interpreted as "There is no timeout"
		return state.state.settings.timeoutInSeconds || 0;
	},

	startSignal: (state) => {
		return state.state.settings.startSignal || 0;
	},

	goBackStepButton: (state) => {
		return state.state.settings.goBackStepButton.toLowerCase() || '';
	},

	goBackButtonMessage: (state) => {
		return state.state.settings.goBackButtonMessage || '';
	},

	skipStepButton: (state) => {
		return state.state.settings.skipStepButton.toLowerCase() || '';
	},

	skipStepButtonMessage: (state) => {
		return state.state.settings.skipStepButtonMessage || '';
	},

	footnoteMessage: (state) => {
		return state.state.settings.footnoteMessage || '';
	},

	footnoteType: (state) => {
		let footnoteType = defaultState.DEFAULT_FOOTNOTE_TYPE;
		if (typeof state.state.settings.footnoteType === 'string') footnoteType = state.state.settings.footnoteType;
		else if (typeof state.settings.footnoteType === 'string') footnoteType = state.settings.footnoteType;
		return footnoteType;
	},

	mainOptionText: (state) => {
		return state.state.settings.mainOptionText;
	},
};
