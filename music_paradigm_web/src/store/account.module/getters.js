export default {
	accountId: (state) => {
		return state.user._id;
	},

	username: (state) => {
		return state.user.username;
	},

	curriculumId: (state) => {
		return state.user.curriculum;
	},

	isLoggedIn: (state) => {
		return state.status.loggedIn;
	},

	isLoggingIn: (state) => {
		return state.status.loggingIn;
	},

	firstName: (state) => {
		return state.user.firstName || "";
	},

	middleName: (state) => {
		return state.user.middleName || "";
	},

	lastName: (state) => {
		return state.user.lastName || "";
	},

	fullName: (state, getters) => {
		return getters.firstName ? (getters.firstName + ' ') : '' + 
			getters.middleName ? (getters.middleName + ' ') : '' + 
			getters.lastName;
	},

	isFetchingProgressionSummary: (state) => {
		return state.status.isFetchingProgressionSummary;
	},

	progressionSummary: (state) => {
		return state.progressionSummary;
	},

	hasDueExperiment: (state) => {
		return Boolean(state.dueExperimentAssociativeId);
	},

	isAdmin: (state) => {
		return state.user.role === 'admin';
	},
};
