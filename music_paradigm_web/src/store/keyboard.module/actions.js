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
	addPressedKeyboardKey: ({ commit }, key) => {
		commit('addPressedKeyboardKey', key);
	},
	deletePressedKeyboardKey: ({ commit }, key) => {
		commit('deletePressedKeyboardKey', key);
	},

	// Mutations related to midi keys (when there is a keyboard to midi mapping)
	updateMidiFileTriggeredAssociatedKeys: ({ commit }, midiFileTriggeredKeys) => {
		commit('updateMidiFileTriggeredAssociatedKeys', midiFileTriggeredKeys);
	},

	updateMidiFileAssociatedKeys: ({ commit }, midiFileKeys) => {
		commit('updateMidiFileAssociatedKeys', midiFileKeys);
	},

	// Log of played notes
	addPressedKeyboardKeyLog: ({ commit }, key) => {
		commit('addPressedKeyboardKeyLog', key);
	},

	addReleasedKeyboardKeyLog: ({ commit }, key) => {
		commit('addReleasedKeyboardKeyLog', key);
	},

	resetPressedKeyboardKeysLogs: ({ commit }) => {
		commit('resetPressedKeyboardKeysLogs');
	},

	// Midi file management
	eraseReferenceKeyboardKeys: ({ commit }) => {
		commit('eraseReferenceKeyboardKeys');
	},
	loadReferenceKeyboardKeys: ({ commit, dispatch, rootGetters }) => {
		dispatch('eraseReferenceKeyboardKeys');
		commit('loadReferenceKeyboardKeys', rootGetters['experiment/referenceKeyboardKeys']);
	},

	evaluateSpeedType: ({ commit, dispatch, getters }) => {
		commit('evaluateSpeedType');
		dispatch('evaluation/evaluateKeyboardSpeedType', getters.results, { root: true });
	},
};
