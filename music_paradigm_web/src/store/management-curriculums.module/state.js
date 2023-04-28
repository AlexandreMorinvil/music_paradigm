import { CurriculumSummariesManager } from '@/modules/curriculums';

export default {
	status: {
		fetchingAndSelectingCurriculumId: null,
		isCreatingCurriculum: false,
		isDeletingCurriculum: false,
		isFetchingCurriculumSummariesList: false,
		isUpdatingCurriculum: false,
	},
	curriculumSummariesManager: new CurriculumSummariesManager(),
};
