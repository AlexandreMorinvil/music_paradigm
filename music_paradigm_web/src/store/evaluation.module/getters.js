export default {
	// Getters for the evaluations
	hasGrades: (state) => {
		return Boolean(state.played.evaluation.grades);
	},

	grades: (state) => {
		return state.played.evaluation.grades;
	},

	hasSuccess: (state) => {
		if (state.played.evaluation.grades.length <= 0) return false;
		for (const grade of state.played.evaluation.grades) {
			if (grade.mark < grade.passMark) return false;
		}
		return true;
	},

	evaluationSimpleLogPreprocesed: (state) => {
		return {
			type: state.type,
			...state.grades,
		};
	},

	evluationPianoLogSummary: (state) => {
		return {
			type: state.type,
			grades: state.grades,
			preprocessedMetrics: state.played.evaluation.results,
		};
	},
};
