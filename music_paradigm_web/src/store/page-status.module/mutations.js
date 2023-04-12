export default {
	saveListTableState(state, { listTableId, listTableStateBackup }) {
		if (!listTableId || !listTableStateBackup) return;
		state.listTableState[listTableId] = listTableStateBackup.toObject();
		new Promise(function (resolve) { // Storing done asynchronously to improve performance
			localStorage.setItem('listTableState', JSON.stringify({ [listTableId]: listTableStateBackup }));
			resolve();
		});
	},
};
