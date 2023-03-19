export default {
	hasSelectedUserProgression: (_, getters) => {
		return Boolean(getters.userProgressionSelectionId);
	},

	hasUserProgressionSelectionCurriculumReference: (_, getters) => {
		return Boolean(getters.userProgressionSelectionCurriculumReference);
	},

	userProgressionSelection: (state) => {
		return state.selectionUserProgression;
	},

	userProgressionSelectionAssignedParameters: (state) => {
		return state.selectionUserProgression.assignedParameters;
	},

	userProgressionSelectionCurriculumParameters: (getters) => {
		return getters.userProgressionSelectionCurriculumSummary ? 
			getters.userProgressionSelectionCurriculumSummary.parametersList : [];
	},

	userProgressionSelectionCurriculumReference: (state) => {
		return state.selectionUserProgression.curriculumReference;
	},

	userProgressionSelectionCurriculumSummary: (_, getters, __, rootGetters) => {
		const curriculumId = getters.userProgressionSelectionCurriculumReference;
		const curriculumSummariesManager = rootGetters['managementCurriculums/curriculumSummariesManager'];
		return curriculumSummariesManager.getCurriculumSummaryById(curriculumId);
	},

	userProgressionSelectionDuration: (state) => {
		return state.selectionUserProgression.duration;
	},

	userProgressionSelectionId: (state) => {
		return state.selectionUserProgression._id;
	},

	userProgressionSelectionLastProgressionDate: (state) => {
		return state.selectionUserProgression.lastProgressionDate;
	},

	userProgressionSelectionLastProgressionTimePassed: (state) => {
		return state.selectionUserProgression.lastProgessionTimePassed;
	},

	userProgressionSelectionStartTime: (state) => {
		return state.selectionUserProgression.startTime;
	},

	userProgressionSelectionStartTimePassed: (state) => {
		return state.selectionUserProgression.startTimePassed;
	},
};
