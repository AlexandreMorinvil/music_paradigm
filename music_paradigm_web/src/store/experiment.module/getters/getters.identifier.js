// Getters used for get the unique iditifiers of the experiment
export default {
	experimentId: (state) => {
		return state._id;
	},

	experimentGroup: (state) => {
		return state.description.group || 'UNKNOWN_GROUP';
	},

	experimentName: (state) => {
		return state.description.name || 'UNKNOWN_NAME';
	},

	experimentVersion: (state) => {
		return state.description.version || 0;
	},
};
