import { controllerToMidiMapper } from '@/_helpers';
import { defaultState } from '@/store-helper/experiment.module-helper';

// All the getters for the parameters oriented toward the frame of the experiments
export default {
	initialTimeInSeconds: (state) => {
		return state.initialTimeIndicated;
	},

	keyboardToMidiInputMapping: (state) => {
		return controllerToMidiMapper.getKeyToMidiNoteMapping(state.keyboardToMidiInputMapping);
	},

	keyboardToClickerInputMapping: (state) => {
		return controllerToMidiMapper.getkeyToCickerButtonMapping(state.keyboardToMidiInputMapping);
	},

	hasKeyboardToMidiInputMapping: (state) => {
		return Object.keys(state.keyboardToMidiInputMapping).length > 0;
	},

	controlType: (state) => {
		return state.settings.controlType || defaultState.DEFAULT_CONTROL_TYPE;
	},

	timeLimitInSeconds: (state) => {
		return state.settings.timeLimitInSeconds || 0;
	},

	instrument: (state) => {
		return state.settings.instrument || defaultState.DEFAULT_INSTRUMENT;
	},

	midiOffset: (state) => {
		const NOTES_PER_OCTAVE = 12;
		return state.settings.programmedOctaveOffset * NOTES_PER_OCTAVE;
	},

	withTimer: (state) => {
		return state.settings.withTimer;
	},

	withProgressionBar: (state) => {
		let withProgressionBar = defaultState.DEFAULT_WITH_PROGRESSION_BAR;
		if (typeof state.settings.withProgressionBar === 'boolean') withProgressionBar = state.settings.withProgressionBar;
		return withProgressionBar;
	},

	hasClearBackground: (state) => {
		return state.settings.hasClearBackground;
	},

	hasSound: (state) => {
		return state.settings.hasSound;
	},
};
