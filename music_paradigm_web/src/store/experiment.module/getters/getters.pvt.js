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

	pvtMaxResponseTime: (state) => {
		return state.state.settings.pvtMaxResponseTime;
	},

	pvtTooEarlyMessage: (state) => {
		return state.state.settings.pvtTooEarlyMessage;
	},

	pvtHasCentralElement: (state) => {
		return state.state.settings.pvtHasCentralElement;
	},
};
