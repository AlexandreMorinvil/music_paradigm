import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { edition } from './edition.module';
import { selection } from './selection.module';
import { sessions } from './sessions.module';

export const progressions = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		edition,
		selection,
		sessions,
	}
};
