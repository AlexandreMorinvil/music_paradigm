export default {
	saveListTableState({ commit }, { listTableId, listTableStateBackup }) {
		commit('saveListTableState', { listTableId, listTableStateBackup });
	},
};
