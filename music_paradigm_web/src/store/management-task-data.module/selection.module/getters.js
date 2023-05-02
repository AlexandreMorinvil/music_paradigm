export default {
	beingFetchedAndSelectedTaskDataEntryId: (state) => {
		return state.status.beingFetchedAndSelectedTaskDataEntryId;
	},

	hasSelectedTaskDataEntry: (state) => {
		return Boolean(state.selectionTaskDataEntry.id);
	},

	isExecutingTaskDataSelectionCommand: (state) => {
		return Object.values(state.status).some((value) => Boolean(value));
	},

	taskDataEntrySelectionData: (state) => {
		return state.selectionTaskDataEntry.data;
	},

	taskDataEntrySelectionId: (state) => {
		return state.selectionTaskDataEntry._id;
	},
};
