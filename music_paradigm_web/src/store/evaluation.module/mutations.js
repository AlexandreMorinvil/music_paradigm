import { keyboardPerformance, notePerformance } from '@/_helpers';
import config from '@/config';

export default {
	evaluateSpeedType: (state, results) => {
		state.grades = notePerformance.gradeSpeedType(results, {
			minSequencePlayed: config.minSequencePlayed || 1,
		});
	},

	evaluateRhythmType: (state, {
		results: results,
		relativeRhythmImportance: relativeRhythmImportance,
		rhythmErrorMarginInMilliseconds: rhythmErrorMarginInMilliseconds,
		rhythmRelativeErrorMarginInFloat: rhythmRelativeErrorMarginInFloat
	}) => {
		state.grades = notePerformance.gradeRhythmType(
			results,
			{ minNoteAccuracy: config.minNoteAccuracy || 100, maxRhythmError: config.maxRhythmError || 15 },
			{
				relativeRhythmImportance: relativeRhythmImportance,
				rhythmErrorMarginInMilliseconds: rhythmErrorMarginInMilliseconds,
				rhythmRelativeErrorMarginInFloat: rhythmRelativeErrorMarginInFloat,
			}
		);
	},

	evaluateMelodyType: (state, results) => {
		state.grades = notePerformance.gradeMelodyType(results, {
			minNoteAccuracy: config.minNoteAccuracy || 100,
		});
	},

	evaluateKeyboardSpeedType: (state, results) => {
		state.grades = keyboardPerformance.gradeSpeedType(results, {
			minSequencePlayed: config.minSequencePlayed || 1,
		});
	},
};
