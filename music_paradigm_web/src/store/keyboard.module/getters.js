export default {
	// Getter for the piano initialization status
	isKeyboardInitialized: (state) => {
		return state.isKeyboardInitialized;
	},

	isKeyboardPaused: (state) => {
		return state.isKeyboardPaused;
	},

	// Getter for the pressed keys
	currentlyPressedKeyboardKeys: (state) => {
		return state.pressedKeys;
	},

	pressedKeyboardKeys: (state) => {
		return state.played.presses.keys;
	},

	// Getter for the midi file triggered keys (if there is a keyboard to midi mapping)
	midiFileTriggeredAssociatedKeys: (state) => {
		return state.midiFileTriggeredAssociatedKeys;
	},

	midiFileAssociatedKeys: (state) => {
		return state.midiFileAssociatedKeys;
	},

	// Getter for the reference keys
	referenceKeyboardKeys: (state) => {
		return state.referenceKeys;
	},

	results: (state) => {
		return state.played.evaluation.results;
	},

	keyboardSimpleLogSummary: (state) => {
		return {
			referenceKeyboardName: '@keyboard_sequence : ' + state.referenceKeys.join('-'),
			referenceKeyboardKeys: state.referenceKeys,

			pressedKeyboardStartTime: state.played.startTime,
			pressedKeyboardKeys: state.played.presses.keys,
			pressedKeyboardTime: state.played.presses.time,
			pressedKeyboardDuration: state.played.presses.duration,
			pressKeyboardConsideredStart: state.played.evaluation.consideredStart,
		};
	},

	keyboardSimpleLogPreprocesed: (state) => {
		return state.played.evaluation.results;
	},
};
