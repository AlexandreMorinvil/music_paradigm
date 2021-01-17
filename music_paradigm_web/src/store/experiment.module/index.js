import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const experiment = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
