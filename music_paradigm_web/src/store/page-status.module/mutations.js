export default {
	saveListTableState(state, { listTableId, listTableStateBackup }) {
		if (!listTableId || !listTableStateBackup) return;
		state.listTableState[listTableId] = listTableStateBackup.toObject();
	},
};
