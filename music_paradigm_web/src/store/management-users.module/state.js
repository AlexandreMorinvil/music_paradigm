import { User } from "@/modules/users";

export default {
	status: {
		isCreatingUser: false,
		isDeletingUser: false,
		isFetchingUsersSummaryList: false,
		isGettingExistingUserGroupsList: false,
		isUpdatingUser: false,
	},

	// Selected user information
	selectedUser: new User(),

	// Users list
	usersSummaryList: [],
	existingUserGroupsList: [],
};
