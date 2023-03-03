import { User } from "@/modules/users";

export default {
	// Status Updates
	indicateAssignCurriculumRequest(state) {
		state.status.isAssigningCurriculum = true;
	},

	indicateAssignCurriculumRequestEnd(state) {
		state.status.isAssigningCurriculum = false;
	},

	indicateCreateRequest(state) {
		state.status.isCreatingUser = true;
	},

	indicateCreateRequestEnd(state) {
		state.status.isCreatingUser = false;
	},

	indicateDeleteRequest(state) {
		state.status.isDeletingUser = true;
	},

	indicateDeleteRequestEnd(state) {
		state.status.isDeletingUser = false;
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

	indicateUpdateRequest(state) {
		state.status.isUpdatingUser = true;
	},

	indicateUpdateRequestEnd(state) {
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
