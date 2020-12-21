import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export const piano = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
