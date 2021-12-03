// parameters for the evaluations
export default {
	relativeRhythmImportance: (state) => {
		let relativeRhythmImportance = state.settings.relativeRhythmImportance;
		if (typeof state.settings.relativeRhythmImportance !== 'number') relativeRhythmImportance = defaultState.DEFAULT_RELATIVE_RHYTHM_IMPORTANCE;
		if (relativeRhythmImportance < 0) return 0;
		else if (relativeRhythmImportance > 1) return 1;
		else return relativeRhythmImportance;
	},

	rhythmErrorMarginInMilliseconds: (state) => {
		return Math.max(0, state.settings.rhythmErrorMarginInMilliseconds);
	},

	rhythmRelativeErrorMarginInFloat: (state) => {
		return Math.max(0, state.settings.rhythmRelativeErrorMarginInFloat);
	},
};
