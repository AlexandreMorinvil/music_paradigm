export default {
	// Performance evaluation
	evaluateRhythmType: ({ commit }, results) => {
		commit('evaluateRhythmType', results);
	},
	evaluateSpeedType: ({ commit }, results) => {
		commit('evaluateSpeedType', results);
	},
	evaluateMelodyType: ({ commit }, results) => {
		commit('evaluateMelodyType', results);
	},
	evaluateKeyboardSpeedType: ({ commit }, results) => {
		commit('evaluateKeyboardSpeedType', results);
	},
};
