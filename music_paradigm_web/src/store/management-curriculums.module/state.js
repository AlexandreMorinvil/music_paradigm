import { curriculumGenerator, CurriculumSummariesManager } from '@/modules/curriculums';

export default {
	status: {
		isFetchingCurriculumsList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
	},
	selection: curriculumGenerator.GENERATE_BLANK_CURRICULUM(),
	curriculumSummariesManager: new CurriculumSummariesManager(),
};
