import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const users = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
