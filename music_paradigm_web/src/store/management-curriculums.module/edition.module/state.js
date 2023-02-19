import { curriculumGenerator } from '@/modules/curriculums';

export default {
	editionCurriculum: curriculumGenerator.GENERATE_BLANK_CURRICULUM(),
	isInCurriculumEditionSessionAdditionMode: false,
	selectedSessionIndex: -1,
};
