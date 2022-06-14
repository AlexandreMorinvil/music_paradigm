// PVT state parameters
export default {
	pvtMinTime: (state) => {
		return state.state.settings.pvtMinTime;
	},

	pvtMaxTime: (state) => {
		return state.state.settings.pvtMaxTime;
	},

	pvtCount: (state) => {
		return state.state.settings.pvtCount;
	},

	pvtTooEarlyMessage: (state) => {
		return state.state.settings.pvtTooEarlyMessage;
	},

	pvtHasCentralElement: (state) => {
		return state.state.settings.pvtHasCentralElement;
	},
};
