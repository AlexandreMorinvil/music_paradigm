import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const selection = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
