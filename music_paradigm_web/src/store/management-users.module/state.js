import { User } from "@/modules/users";

export default {
	status: {
		isFetchingUsersSummaryList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		isAssigningCurriculum: false,
	},

	// Selected user information
	selectedUser: new User(),

	// Users list
	usersSummaryList: [],
};
