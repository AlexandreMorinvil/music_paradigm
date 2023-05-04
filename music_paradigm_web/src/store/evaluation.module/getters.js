export default {
	hasGrades: (state) => {
		return Boolean(state.grades);
	},

	grades: (state) => {
		return state.grades;
	},

	/**
	 * Transforms the grades from a list of ojects : 
	 * 
	 * [{ gradeCode: X1, criteria: Y1, mark: Z1, ... }, 
	 *  { gradeCode: X2, criteria: Y2, mark: Z2, ... }, ...]
	 * 
	 * Into an object with all the attributes of the objects prefixed by their gradeCode :
	 * 
	 * { X1_criteria: Y1, X1_mark: Z1, ... X2_criterial: Y2, X2_mark: Z2, ... }
	 * 
	 * The gradeCode of each object does not have an attribute in the resulting object.
	 * The criteria is of each object is also not included in the attributes of the resulting
	 * object since the critera is implicit for in the gradeCode prefixed to each attribute
	 * 
	 * This method is used for the log generation.
	 */
	unwoundGrades: (state) => {
		const unwoundGrades = {};
		for (const gradeObject of state.grades)
			for (const key of Object.keys(gradeObject)) {
				if (key == 'gradeCode') continue;
				if (key == 'criteria') continue;
				unwoundGrades[gradeObject.gradeCode + key] = gradeObject[key];
			}
		return unwoundGrades;
	},

	hasSuccess: (state) => {
		if (!state.grades) return false;
		if (state.grades.length <= 0) return false;
		for (const grade of state.grades) {
			if (grade.mark < grade.passMark) return false;
		}
		return true;
	},

	evluationPianoLogSummary: (state) => {
		return {
			type: state.type,
			grades: state.grades,
		};
	},
};
