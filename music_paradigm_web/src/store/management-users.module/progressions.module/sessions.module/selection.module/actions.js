export default {
	setProgressionSessionSelection({ commit, dispatch }, session) {
		dispatch('unsetSessionCompletionCountSelection');
		commit('setProgressionSessionSelection', session);
	},

	setSessionCompletionCountSelection({ commit, dispatch }, coumpletionCount) {
		dispatch('unsetSessionCompletionCountSelection');
		commit('setSessionCompletionCountSelection', coumpletionCount);
	},

	unsetProgressionSessionSelection({ commit, dispatch }) {
		dispatch('unsetSessionCompletionCountSelection');
		commit('unsetProgressionSessionSelection');
	},

	unsetSessionCompletionCountSelection({ commit }) {
		commit('unsetSessionCompletionCountSelection');
	},
};