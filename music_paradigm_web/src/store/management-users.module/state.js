import { User } from "@/modules/users";

export default {
	status: {
		isAssigningCurriculum: false,
		isCreatingUser: false,
		isDeletingUser: false,
		isFetchingUsersSummaryList: false,
		isGettingExistingUserGroupsList: false,
		isUpdating: false,
	},

	// Selected user information
	selectedUser: new User(),

	// Users list
	usersSummaryList: [],
	existingUserGroupsList: [],
};
