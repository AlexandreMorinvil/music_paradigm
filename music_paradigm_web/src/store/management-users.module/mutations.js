import { User } from "@/modules/users";

export default {
	indicateIsCreatingUser(state, isActive) {
		state.status.isCreatingUser = isActive;
	},

	indicateIsCreatingUserWithCurriculum(state, isActive) {
		state.status.isCreatingUserWithCurriculum = isActive;
	},

	indicateIsDeletingUser(state, isActive) {
		state.status.isDeletingUser = isActive;
	},

	indicateFetchingUser(state, isActive) {
		state.status.isFetchingUser = isActive;
	},

	indicateFetchingUserList(state, isActive) {
		state.status.isFetchingUsersSummaryList = isActive;
	},

	indicateGettingExistingUserGroupsList(state, isActive) {
		state.status.isGettingExistingUserGroupsList = isActive;
	},

	indicateIsUpdatingUser(state, isActive) {
		state.status.isUpdatingUser = isActive;
	},

	setExistingUserGroupsList(state, groupsList) {
		state.existingUserGroupsList = groupsList;
	},

	setSummariesList(state, usersSummaryList) {
		state.usersSummaryList = usersSummaryList;
	},
};
