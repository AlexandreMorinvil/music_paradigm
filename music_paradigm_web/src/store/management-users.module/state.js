import { User, UserSummariesManager } from "@/modules/users";

export default {
	status: {
		isCreatingUser: false,
		isCreatingUserWithCurriculum: false,
		isDeletingUser: false,
		fetchingAndSelectingUserId: null,
		isFetchingUser: false,
		isFetchingUsersSummaryList: false,
		isGettingExistingUserGroupsList: false,
		isUpdatingUser: false,
	},

	// Selected user information
	selectedUser: new User(), // TODO: To delete once the code will have been adjusted 

	// Users list
	userSummariesListManager: new UserSummariesManager(),
	existingUserGroupsList: [],
};
