export default {
	hasSelectedUserProgression: (_, getters) => {
		return Boolean(getters.userProgressionSelectionId);
	},

	hasUserProgressionSelectionCurriculumReference: (state) => {
		return state.selectionUserProgression.curriculumReference !== null;
	},

	userProgressionSelectionCurriculumReference: (state) => {
		return state.selectionUserProgression.curriculumReference;
	},

	userProgressionSelectionId: (state) => {
		return state.selectionUserProgression._id;
	},
};
