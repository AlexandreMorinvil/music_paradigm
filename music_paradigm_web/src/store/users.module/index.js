import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { progressions } from './progressions.module';

export const users = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		progressions
	}
};
