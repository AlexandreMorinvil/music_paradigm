export default {
	indicateFetchingCurriculumList(state) {
		state.status.isFetchingCurriculumSummariesList = true;
	},

	indicateFetchingCurriculumListEnd(state) {
		state.status.isFetchingCurriculumSummariesList = false;
	},

	indicateCreateRequest(state) {
		state.status.isCreating = true;
	},

	indicateCreateRequestEnd(state) {
		state.status.isCreating = false;
	},

	indicateUpdateRequest(state) {
		state.status.isUpdating = true;
	},

	indicateUpdateRequestEnd(state) {
		state.status.isUpdating = false;
	},

	indicateDeleteRequest(state) {
		state.status.isDeleting = true;
	},

	indicateDeleteRequestEnd(state) {
		state.status.isDeleting = false;
	},

	setCurriculumSummariesList(state, curriculumSummariesList) {
		state.curriculumSummariesManager.setCurriculumSummariesList(curriculumSummariesList);
	},
};
