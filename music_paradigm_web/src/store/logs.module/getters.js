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

	simpleLogList: (state) => {
		return state.simpleLogList;
	},

	thoroughLogList: (state) => {
		return state.thoroughLogList;
	},
};
