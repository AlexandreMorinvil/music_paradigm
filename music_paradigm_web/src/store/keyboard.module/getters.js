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

	// Getter for the reference keys
	referenceKeyboardKeys: (state) => {
		return state.referenceKeys;
	},

	results: (state) => {
		return state.played.evaluation.results;
	},

	keyboardSimpleLogSummary: (state) => {
		return {
			reference: state.referenceKeys,

			pressStartTime: state.played.startTime,
			pressedKeys: state.played.presses.midi,
			pressedTime: state.played.presses.time,
			pressedDuration: state.played.presses.duration,
		};
	},

	keyboardSimpleLogPreprocesed: (state) => {
		return {
			consideredStart: state.played.evaluation.consideredStart,
			...state.played.evaluation.results,
		};
	},

	keyboardLogSummary: (state) => {
		return {
			reference: state.referenceKeys,
			played: {
				startTime: state.played.startTime,
				keys: state.played.presses.keys,
				time: state.played.presses.time,
				duration: state.played.presses.duration,
			},
			consideredStart: state.played.evaluation.consideredStart,
			preprocessedMetrics: state.played.evaluation.results,
		};
	},
};
