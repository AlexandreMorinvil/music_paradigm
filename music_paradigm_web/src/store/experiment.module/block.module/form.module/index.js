import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const form = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
