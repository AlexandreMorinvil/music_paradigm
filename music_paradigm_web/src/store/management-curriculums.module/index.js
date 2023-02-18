import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { edition } from './edition.module';
import { selection } from './selection.module';

export const managementCurriculums = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		edition,
		selection,
	}
};
