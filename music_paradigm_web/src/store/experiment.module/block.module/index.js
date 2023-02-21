import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

// Nested modules
import { form } from './form.module';

export const block = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
	modules: {
		form,
	}
};
