import { keyboardPerformance, notePerformance } from '@/_helpers';
import config from '@/config';

export default {
	// Mutations for note performance evaluation
	evaluateSpeedType: (state, results) => {
		state.grades = notePerformance.gradeSpeedType(results, {
			minSequencePlayed: config.minSequencePlayed || 1,
		});
	},

	evaluateRhythmType: (state, results) => {
		state.grades = notePerformance.gradeRhythmType(results, {
			minNoteAccuracy: config.minNoteAccuracy || 100,
			maxRhythmError: config.maxRhythmError || 15,
		});
	},

	evaluateMelodyType: (state, results) => {
		state.grades = notePerformance.gradeMelodyType(results, {
			minNoteAccuracy: config.minNoteAccuracy || 100,
		});
	},

	// Mutations for note performance evaluation
	evaluateKeyboardSpeedType: (state, results) => {
		state.grades = keyboardPerformance.gradeSpeedType(results, {
			minSequencePlayed: config.minSequencePlayed || 1,
		});
	},
};
