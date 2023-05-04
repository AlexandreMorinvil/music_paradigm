import { TaskDataEntry } from "@/modules/task-data";

export default {
	indicateFetchingAndSelectingTaskDataEntryById(state, id) {
		state.status.beingFetchedAndSelectedTaskDataEntryId = id;
	},
	
	setTaskDataEntrySelection(state, taskDataEntry) {
		state.selectionTaskDataEntry = new TaskDataEntry(taskDataEntry);
	},

	unsetTaskDataEntrySelection(state) {
		state.selectionTaskDataEntry = new TaskDataEntry();
	},
};