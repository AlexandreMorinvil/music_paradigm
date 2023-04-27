import { curriculumGenerator, CurriculumSummariesManager } from '@/modules/curriculums';

export default {
	status: {
		isCreatingCurriculum: false,
		isDeletingCurriculum: false,
		isFetchingCurriculumSummariesList: false,
		isUpdatingCurriculum: false,
	},
	selection: curriculumGenerator.GENERATE_BLANK_CURRICULUM(),
	curriculumSummariesManager: new CurriculumSummariesManager(),
};
