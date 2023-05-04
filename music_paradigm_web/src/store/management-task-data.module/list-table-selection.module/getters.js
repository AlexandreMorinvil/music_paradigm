export default {
	hasTaskDataListTableSelection: (_, getters) => {
		return getters.taskDataListTableSelection.hasElements;
	},

	isAdminTaskDataListTableSelection: (state) => {
		return state.taskDataListTableSelection.isContextContaining('admin');
	},

	taskDataListTableSelection: (state) => {
		return state.taskDataListTableSelection;
	},

	taskDataListTableSelectionCount: (state) => {
		return state.taskDataListTableSelection.elementsCount;
	},

	taskDataListTableSelectionIdsList: (_, getters) => {
		return getters.taskDataListTableSelection.idsList;
	},
};
