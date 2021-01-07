export default {
	// Getters for the evaluations
	hasGrades: (state) => {
		return Boolean(state.grades);
	},

	grades: (state) => {
		return state.grades;
	},

	hasSuccess: (state) => {
		if (state.grades.length <= 0) return false;
		for (const grade of state.grades) {
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
		};
	},
};
