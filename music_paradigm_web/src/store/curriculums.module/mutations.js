export default {
	// // Status Updates
	indicateFetchingCurriculumList(state) {
		state.status.isFetchingCurriculumsList = true;
	},

	indicateFetchingCurriculumListEnd(state) {
		state.status.isFetchingCurriculumsList = false;
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

	// Setters
	setSelectedCurriculum(state, curriculum) {
		state.selection = {};
		Object.assign(state.selection, curriculum);
	},

	unsetSelectedCurriculum(state) {
		state.selection = {};
	},

	setHeadersList(state, usersHeadersLst) {
		state.curriculumsList = usersHeadersLst;
	},
};
