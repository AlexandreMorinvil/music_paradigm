import { cursorHandler } from '@/store-helper/experiment.module-helper';

// Information kept to save the progression within an experiment
export default {
	checkpoint: (state) => {
		return state.state.settings.checkpoint || '';
	},

	state: (state) => {
		return state.state;
	},

	cursor: (state) => {
		return state.cursor;
	},

	timeIndicated: (state) => {
		return state.state.record.timeIndicatedInMilliseconds;
	},

	progressRatio: (state) => {
		return cursorHandler.stepsCompletionRatio(state.flow, state.cursor);
	},
};
