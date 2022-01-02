export default {
	isLoadingUserSimpleLogList: (state) => {
		return state.status.isLoadingUserSimpleLogList || false;
	},

	isLoadingUserThoroughLogList: (state) => {
		return state.status.isLoadingUserThoroughLogList || false;
	},

	isLoadingAdminSimpleLogList: (state) => {
		return state.status.isLoadingAdminSimpleLogList || false;
	},

	isLoadingAdminThoroughLogList: (state) => {
		return state.status.isLoadingAdminThoroughLogList || false;
	},

	userSimpleLogList: (state) => {
		return state.userSimpleLogList;
	},

	userThoroughLogList: (state) => {
		return state.userThoroughLogList;
	},

	adminSimpleLogList: (state) => {
		return state.userSimpleLogList;
	},

	adminThoroughLogList: (state) => {
		return state.userThoroughLogList;
	},
};
