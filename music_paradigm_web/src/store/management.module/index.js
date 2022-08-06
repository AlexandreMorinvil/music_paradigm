import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { tasks } from './tasks.module';

export const management = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		tasks
	}
};
