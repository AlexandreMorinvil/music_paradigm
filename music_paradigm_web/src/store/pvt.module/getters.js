export default {
	pvtStimuli: (state) => {
		return state.pvtStimuli;
	},

	pvtInputTimes: (state) => {
		return state.pvtInputTimes;
	},

	pvtReactionTimes: (state) => {
		return state.pvtReactionTimes;
	},

	pvtReactionTooEarly: (state) => {
		return state.pvtReactionTooEarly;
	},

	pvtMinTime: (state) => {
		return state.pvtMinTime;
	},

	pvtMaxTime: (state) => {
		return state.pvtMaxTime;
	},

	pvtCount: (state) => {
		return state.pvtReactionTimes.length;
	},

	pvtHasCentralElement: (state) => {
		return state.pvtHasCentralElement;
	},

	// Computed results
	pvtReactionTimeAverage: (state) => {
		return state.pvtReactionTimes.reduce((a, b) => a + b, 0) / state.pvtReactionTimes.length;
	},
};
