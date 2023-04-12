import { ListTableStateBackup } from "@/modules/list-tables";

export default {
	localStorageListTableState: () => {
		return JSON.parse(localStorage.getItem('listTableState')) ?? {};
	},

	listTableState: (state, getters) => (listTableId) => {
		let listTableState = state.listTableState[listTableId];
		if (listTableState) return new ListTableStateBackup(listTableState);

		listTableState = getters.localStorageListTableState[listTableId];
		return new ListTableStateBackup(listTableState);		
	},
};
