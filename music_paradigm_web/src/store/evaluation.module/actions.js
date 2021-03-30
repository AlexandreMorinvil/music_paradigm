export default {
	// Performance evaluation
	evaluateRhythmType: ({ commit }, { results: results, relativeRhythmImportance: relativeRhythmImportance }) => {
		commit('evaluateRhythmType', { results: results, relativeRhythmImportance: relativeRhythmImportance });
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
