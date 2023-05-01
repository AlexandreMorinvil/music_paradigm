import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const managementTaskData = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
