import { ListTableStateBackup } from "@/modules/list-tables";

export default {
	listTableState: (state) => (listTableId) => {
		const listTableState = state.listTableState[listTableId];
		return new ListTableStateBackup(listTableState);
	},
};
