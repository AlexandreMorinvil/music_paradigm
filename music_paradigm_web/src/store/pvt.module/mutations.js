import { defaultState } from '@/store-helper/pvt.module-helper';

export default {
	setPvtResults: (state, result) => {
		state.pvtStimuli = result.pvtStimuli;
		state.pvtInputTimes = result.pvtInputTimes;
		state.pvtReactionTimes = result.pvtReactionTimes;
		state.pvtReactionTooEarly = result.pvtReactionTooEarly;
	},

	setPvtContext: (state, context) => {
		state.pvtMinTime = context.pvtMinTime;
		state.pvtMaxTime = context.pvtMaxTime;
		state.pvtHasCentralElement = context.pvtHasCentralElement;
	},

	resetPvtState: (state) => {
		Object.assign(state, defaultState.DEFAULT_PVT_STATE());
	},
};
