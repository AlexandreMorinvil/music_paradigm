export default {
	// Performance evaluation
	evaluateRhythmType: ({ commit, rootGetters }) => {
		commit('evaluateRhythmType', {
			results: rootGetters['piano/results'],
		});
	},
	evaluateSpeedType: ({ commit, rootGetters }) => {
		commit('evaluateSpeedType', {
			results: rootGetters['piano/results'],
		});
	},
	evaluateMelodyType: ({ commit, rootGetters }) => {
		commit('evaluateMelodyType', {
			results: rootGetters['piano/results'],
		});
	},
	evaluateKeyboardSpeedType: ({ commit, rootGetters }) => {
		commit('evaluateKeyboardSpeedType', {
			results: rootGetters['keyboard/results'],
		});
	},
};
