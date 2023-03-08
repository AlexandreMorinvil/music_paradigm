import { CurriculumSummary } from '@/modules/curriculums';

export default {
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

	setCurriculumSummariesList(state, curriculumSummariesList) {
		state.curriculumSummariesList = curriculumSummariesList.map((curriculumSummary) => {
			return new CurriculumSummary(curriculumSummary);
		});
	},
};
