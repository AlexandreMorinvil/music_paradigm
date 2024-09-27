import { cursorHandler } from '@/store-helper/experiment.module-helper';

// Information kept to save the progression within an experiment
export default {
	checkpoint: (state) => {
		return state.state.settings.checkpoint || '';
	},

	mustKeepMarkerAfterEnd: (state) => {
		return state.settings.mustKeepMarkerAfterEnd ?? false;
	},

	// Data stored for each marker
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
		if (state.settings.mustPreciselyTrackProgress) return cursorHandler.computeThoroughStepsCompletionRatio(state.flow, state.cursor);
		else return cursorHandler.computeApproximativeStepsCompletionRatio(state.flow, state.cursor);
	},

	// Critical backup
	criticalBackup: (state) => {
		return state.criticalBackup;
	},

	// Current index
	markerCurrentIndex: (state) => {
		// If there is a critical marker, we use it
		const { cursor } = state.criticalBackup;
		return cursor?.current?.index ?? 0;
	}
};
