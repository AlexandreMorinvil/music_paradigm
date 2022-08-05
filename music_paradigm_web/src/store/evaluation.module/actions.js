export default {
	// Performance evaluation
	evaluateGltType: ({ commit }, {
		rightAnswersCount,
		interrogationsCount,
		successThreshold,
	}) => {
		commit('evaluateGltType', {
			rightAnswersCount: rightAnswersCount,
			interrogationsCount: interrogationsCount,
			successThreshold: successThreshold,
		});
	},

	evaluateRhythmType: ({ commit }, {
		results,
		relativeRhythmImportance,
		rhythmErrorMarginInMilliseconds,
		rhythmRelativeErrorMarginInFloat,
	}) => {
		commit('evaluateRhythmType', {
			results: results,
			relativeRhythmImportance: relativeRhythmImportance,
			rhythmErrorMarginInMilliseconds: rhythmErrorMarginInMilliseconds,
			rhythmRelativeErrorMarginInFloat: rhythmRelativeErrorMarginInFloat,
		});
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
