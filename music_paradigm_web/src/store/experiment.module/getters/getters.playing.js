import { defaultState } from '@/store-helper/experiment.module-helper';

// Playing state parameters
export default {
	playingMode: (state) => {
		// Return the playing mode specified by the block if it exists, otherwise, the default playing mode of the experiment is returned.
		let playingMode = defaultState.DEFAULT_PLAYING_MODE;

		if (typeof state.state.settings.playingMode === 'string') playingMode = state.state.settings.playingMode;
		else if (typeof state.settings.playingMode === 'string') playingMode = state.settings.playingMode;

		return playingMode;
	},

	strictPlay: (state) => {
		return state.state.settings.strictPlay || false;
	},

	melodyRepetition: (state) => {
		return state.state.settings.melodyRepetition || 1;
	},
};
