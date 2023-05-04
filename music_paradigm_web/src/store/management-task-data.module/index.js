import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { listTableSelection } from './list-table-selection.module';
import { selection } from './selection.module';

export const managementTaskData = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		listTableSelection,
		selection,
	}
};
