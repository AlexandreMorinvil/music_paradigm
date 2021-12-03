import { defaultState } from '@/store-helper/experiment.module-helper';

// Getters used for the parameters that are global to the session taking place
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

	considerExperimentFinished: (state) => {
		return state.state.record.considerExperimentFinished;
	},
};
