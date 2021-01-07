export default {
	resetKeyboardTracking: ({ commit }) => {
		commit('resetKeyboardTracking');
	},

	// Initialization actions
	setInitializedKeyboardTracking: ({ commit }, isInitialized) => {
		commit('setInitializedKeyboardTracking', isInitialized);
	},

	// Pausing the piano
	pauseKeyboardTracking: ({ commit }) => {
		commit('pauseKeyboardTracking');
	},

	// Pausing the piano
	unPauseKeyboardTracking: ({ commit }) => {
		commit('unPauseKeyboardTracking');
	},

	// Key interaction actions
	addPressedKey: ({ commit }, key) => {
		commit('addPressedKey', key);
	},
	deletePressedKey: ({ commit }, key) => {
		commit('deletePressedKey', key);
	},

	// Log of played notes
	addReleasedKeyLog: ({ commit }, key) => {
		commit('addReleasedKeyLog', key);
	},

	addReleasedNoteLog: ({ commit }, key) => {
		commit('addReleasedNoteLog', key);
	},

	resetPressedKeysLogs: ({ commit }) => {
		commit('resetPressedKeysLogs');
	},

	evaluateSpeedType: ({ commit, dispatch, getters }) => {
		commit('evaluateSpeedType');
		dispatch('evaluation/evaluateKeyboardSpeedType', getters.results, { root: true });
	},
};
