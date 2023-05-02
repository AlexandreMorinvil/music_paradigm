export default {
	hasTaskDataListTableSelection: (_, getters) => {
		return getters.taskDataListTableSelection.hasElements;
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
