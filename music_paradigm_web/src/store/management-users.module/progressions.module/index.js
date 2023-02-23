import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const progressions = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
