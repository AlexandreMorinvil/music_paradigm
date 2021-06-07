import constants from './constants';
import { keyboardPerformance } from '@/_helpers';
import { keysHandler } from '@/store-helper/keyboard.module-helper';

export default {
	resetKeyboardTracking: (state) => {
		Object.assign(state, constants.DEFAULT_KEYBOARD_TRACKER_VALUES());
	},

	// Mutation on isKeyboardInitialized
	setInitializedKeyboardTracking: (state, isInitialized) => {
		state.isKeyboardInitialized = isInitialized || false;
	},

	// Pausing the piano
	pauseKeyboardTracking: (state) => {
		state.isKeyboardPaused = true;
	},

	unPauseKeyboardTracking: (state) => {
		state.isKeyboardPaused = false;
		state.played.evaluation.consideredStart = state.played.keys.length;
	},

	// Mutations on key interations arrays
	addPressedKeyboardKey: (state, key) => {
		// This approach is used to add the pressed keys  in an array to ensure that only one insance of a given key is recorded at a time and to ensure that
		// the mutations on pressedKeys or midiFileTriggeredKeys can be reactive with the vue instances. Doing a direct assignation as pressedKey[key] = true
		// is would be a direct assignation in an Array/Object and would not allow the watch properties of Vue to detect the change of state.
		const selectedIndex = state.pressedKeys.indexOf(key);
		if (selectedIndex === -1) state.pressedKeys.push(key);
	},
	deletePressedKeyboardKey: (state, key) => {
		const selectedIndex = state.pressedKeys.indexOf(key);
		if (selectedIndex !== -1) state.pressedKeys.splice(selectedIndex, 1);
	},
	// Mutations on the data from the notes played
	addPressedKeyboardKeyLog: (state, key) => {
		const keyCount = state.played.presses.keys.length;
		if (keyCount === 0) state.played.startTime = key.time;
		state.played.presses.keys.push(key.key);
		state.played.presses.time.push(key.time - state.played.startTime);
	},

	addReleasedKeyboardKeyLog: (state, key) => {
		state.played.presses.duration.push(key.time - state.played.startTime - state.played.presses.time[state.played.presses.time.length - 1]);
	},

	// Mutations on the reference keys
	eraseReferenceKeyboardKeys: (state) => {
		state.referenceKeys = [];
	},

	loadReferenceKeyboardKeys: (state, referenceKeys) => {
		referenceKeys.forEach(function (key, index) {
			state.referenceKeys[index] = key.toLowerCase();
		});
		state.referenceKeys = referenceKeys;
	},

	resetPressedKeyboardKeysLogs: (state) => {
		// Record start time
		state.played.startTime = 0;

		// Resetting the notes
		state.played.presses.keys = [];
		state.played.presses.time = [];
		state.played.presses.duration = [];

		// Resetting the evaluation
		// We do note reset the grades, in order to have them available to be displayed in a "Feedback" state at any point, until the next evaluation of performances
		state.played.evaluation.type = '';
		state.played.evaluation.results = null;
		state.played.evaluation.consideredStart = 0;
	},

	// Mutations for note performance evaluation
	evaluateSpeedType: (state) => {
		const consideredPressedKeys = keysHandler.selectConsideredKeys(state.played.presses, state.played.evaluation.consideredStart);
		Object.assign(state.played.evaluation, keyboardPerformance.evaluateSpeedType(state.referenceKeys, consideredPressedKeys));
	},
};
