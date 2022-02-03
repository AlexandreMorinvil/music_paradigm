export default {
	DEFAULT_KEYBOARD_TRACKER_VALUES,
};

function DEFAULT_KEYBOARD_TRACKER_VALUES() {
	return {
		// Indicator of whether or not the virtual piano is ready to be used
		isKeyboardInitialized: false,
		isKeyboardPaused: false,

		// The notes being interacted with
		pressedKeys: [],

		// Data from the current MIDI file
		referenceKeys: [],

		// The notes being activated due to the keyboard to midi input mapping
		midiFileTriggeredAssociatedKeys: [],

		// Data from the notes played by the user
		played: {
			startTime: 0, // Time in milliseconds of the first note
			presses: {
				keys: [],
				time: [],
				duration: [],
			},
			evaluation: {
				type: '',
				consideredStart: 0,
				results: null, // { metric: Type, ... }
			},
		},
	};
}
