import _isEqual from 'lodash/isEqual';

export default {
	curriculumSummariesList: (state) => {
		return state.curriculumSummariesManager.curriculumSummariesList;
	},

	curriculumSummariesManager: (state) => {
		return state.curriculumSummariesManager;
	},

	fetchingAndSelectingCurriculumId: (state) => {
		return state.status.fetchingAndSelectingCurriculumId;
	},

	hasEditedCurriculum: (_, getters) => {
		return !_isEqual(
			getters['selection/curriculumSelection'],
			getters['edition/curriculumEdition'],
		);
	},

	hasEditedCurriculumTitle: (_, getters) => {
		return getters['selection/curriculumSelectionTitle'] !==
			getters['edition/curriculumEditionTitle'];
	},

	isCreatingCurriculum: (state) => {
		return state.status.isCreatingCurriculum;
	},

	isDeletingCurriculum: (state) => {
		return state.status.isDeletingCurriculum;
	},

	isExecutingCurriculumCommand: (state) => {
		return Object.values(state.status).some((value) => Boolean(value));
	},

	isFetchingCurriculumSummariesList: (state) => {
		return state.status.isFetchingCurriculumSummariesList;
	},

	isUpdatingCurriculum: (state) => {
		return state.status.isUpdatingCurriculum;
	},
};
