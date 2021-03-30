export default {
	// Performance evaluation
	evaluateRhythmType: ({ commit }, { results: results, isRelativeRhythm: isRelativeRhythm }) => {
		commit('evaluateRhythmType', { results: results, isRelativeRhythm: isRelativeRhythm });
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
