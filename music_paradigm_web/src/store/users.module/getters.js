export default {
	// User values
	userSelectedId: (state) => {
		return state.selectedUser._id;
	},

	userSelectedUsername: (state) => {
		return state.selectedUser.username;
	},

	userSelectedEmail: (state) => {
		return state.selectedUser.email;
	},

	userSelectedFirstName: (state) => {
		return state.selectedUser.firstName;
	},

	userSelectedMiddleName: (state) => {
		return state.selectedUser.middleName;
	},

	userSelectedLastName: (state) => {
		return state.selectedUser.lastName;
	},

	userSelectedTags: (state) => {
		return state.selectedUser.tags;
	},

	userSelectedRole: (state) => {
		return state.selectedUser.role;
	},

	userSelectedCurriculum: (state) => {
		return state.selectedUser.curriculum;
	},

	// Progression parameters
	userSelectedImposedParameters: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.assignedParameters : {};
	},

	userSelectedAdjustmentStartTimeInDays: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.adjustmentStartTimeInDays : 0;
	},

	userSelectedStartTime: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTime : null;
	},

	userSelectedStartTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.startTimePassed : 0;
	},

	userSelectedLastProgressionDate: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgressionDate : null;
	},

	userSelectedLastProgressionTimePassed: (state) => {
		return state.selectedUserProgression ? state.selectedUserProgression.lastProgessionTimePassed : 0;
	},

	// Experiments progression history of the user
	userSelectedProgressionHistory: (state) => {
		return state.selectedUserProgressionHistory;
	},

	// List of users
	usersSummaryList: (state) => {
		return state.usersSummaryList;
	},

	// Status
	hasSelectedUser: (state) => {
		return Boolean(state.selectedUser._id);
	},

	hasCurriculumToSelectedUser: (state) => {
		return Boolean(state.selectedUser.curriculum);
	},

	isFetchingUsersSummaryList: (state) => {
		return state.status.isFetchingUsersSummaryList;
	},
};
