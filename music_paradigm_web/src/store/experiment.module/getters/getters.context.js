import { defaultState } from '@/store-helper/experiment.module-helper';

// All the getters for the parameters oriented toward the frame of the experiments
export default {
	initialTimeInSeconds: (state) => {
		return state.initialTimeIndicated;
	},

	withProgressionBar: (state) => {
		let withProgressionBar = defaultState.DEFAULT_WITH_PROGRESSION_BAR;
		if (typeof state.settings.withProgressionBar === 'boolean') withProgressionBar = state.settings.withProgressionBar;
		return withProgressionBar;
	},
};
