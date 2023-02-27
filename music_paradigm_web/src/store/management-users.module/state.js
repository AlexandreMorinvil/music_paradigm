import { User } from "@/modules/users";

export default {
	status: {
		isAssigningCurriculum: false,
		isCreating: false,
		isDeleting: false,
		isGettingExistingUserGroupsList: false,
		isFetchingUsersSummaryList: false,
		isUpdating: false,
	},

	// Selected user information
	selectedUser: new User(),

	// Users list
	usersSummaryList: [],
	existingUserGroupsList: [],
};
