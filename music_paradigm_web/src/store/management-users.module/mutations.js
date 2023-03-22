import { User } from "@/modules/users";

export default {
	// Status Updates
	indicateIsCreatingUser(state) {
		state.status.isCreatingUser = true;
	},

	indicateIsCreatingUserEnd(state) {
		state.status.isCreatingUser = false;
	},

	indicateIsCreatingUserWithCurriculum(state) {
		state.status.isCreatingUserWithCurriculum = true;
	},

	indicateIsCreatingUserWithCurriculumEnd(state) {
		state.status.isCreatingUserWithCurriculum = false;
	},

	indicateIsDeletingUser(state) {
		state.status.isDeletingUser = true;
	},

	indicateIsDeletingUserEnd(state) {
		state.status.isDeletingUser = false;
	},
	
	indicateFetchingUser(state) {
		state.status.isFetchingUser = true;
	},

	indicateFetchingUserEnd(state) {
		state.status.isFetchingUser = false;
	},

	indicateFetchingUserList(state) {
		state.status.isFetchingUsersSummaryList = true;
	},

	indicateFetchingUserListEnd(state) {
		state.status.isFetchingUsersSummaryList = false;
	},

	indicateGettingExistingUserGroupsList(state) {
		state.status.isGettingExistingUserGroupsList = true;
	},

	indicateGettingExistingUserGroupsListEnd(state) {
		state.status.isGettingExistingUserGroupsList = false;
	},

	indicateIsUpdatingUser(state) {
		state.status.isUpdatingUser = true;
	},

	indicateIsUpdatingUserEnd(state) {
		state.status.isUpdatingUser = false;
	},


	// Setters
	setExistingUserGroupsList(state, groupsList) {
		state.existingUserGroupsList = groupsList;
	},

	// TODO: Delete once the code will have been adjusted
	setSelectedUser(state, user) {
		state.selectedUser = user;
	},

	setSummariesList(state, usersSummaryList) {
		state.usersSummaryList = usersSummaryList;
	},

	// TODO: Delete once the code will have been adjusted
	unsetSelectedUser(state) {
		state.selectedUser = new User();
	},
};
