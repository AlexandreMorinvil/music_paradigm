import { defaultState } from '@/store-helper/experiment.module-helper';

// All the getters for the parameters oriented toward the frame of the experiments
export default {
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

	initialTimeInSeconds: (state) => {
		return state.initialTimeIndicated;
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
	}
};
