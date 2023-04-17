import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { edition } from './edition.module';
import { listTableSelection } from './list-table-selection.module';
import { progressions } from './progressions.module';
import { selection } from './selection.module';

export const managementUsers = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		edition,
		listTableSelection,
		progressions,
		selection,
	}
};
