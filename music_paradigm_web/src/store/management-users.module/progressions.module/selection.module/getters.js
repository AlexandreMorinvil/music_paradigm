export default {
	hasSelectedUserProgression: (_, getters) => {
		return Boolean(getters.userProgressionSelectionId);
	},

	userProgressionSelectionCurriculumReference: (state) => {
		return state.selectionUserProgression.curriculumReference;
	},

	userProgressionSelectionId: (state) => {
		return state.selectionUserProgression._id;
	},
};
