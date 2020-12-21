import functions from'./functions';

export default{
	loginRequest(state) {
		// Set the status to logined in
		Object.assign(state.status, {
			loggingIn: true
		});
	},

	loginSuccess(state, user) {
		// Assing the received user to the store user
		functions.assignUser(state.user, user);

		// Set the status to logined in
		Object.assign(state.status, {
			loggingIn: false,
			loggedIn: true
		});
	},

	loginFailure(state) {
		// Empty the store user
		functions.assignUser(state.user, {});

		// Set the status to not logged in and not logging in
		Object.assign(state.status, {
			loggingIn: false,
			loggedIn: false
		});
	},

	logout(state) {
		// Empty the store user
		functions.assignUser(state.user, {});

		// Set the status to not logged in
		Object.assign(state.status, {
			loggedIn: false
		});
	},

	indicateFetchingProgressionSummary(state) {
		state.status.isFetchingProgressionSummary = true;
	},

	indicateFetchingProgressionSummaryEnd(state) {
		state.status.isFetchingProgressionSummary = false;
	},

	setDueExperiment(state, dueExperiment) {
		state.dueExperiment = dueExperiment;
	},

	setProgressionSummary(state, progressionSummary) {
		state.progressionSummary = progressionSummary;
	}
};
