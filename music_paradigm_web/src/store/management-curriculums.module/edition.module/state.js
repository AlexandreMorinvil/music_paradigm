import { curriculumGenerator } from '@/modules/curriculums';

export default {
	editionCurriculum: curriculumGenerator.GENERATE_BLANK_CURRICULUM(),
	isInCurriculumEditionSessionAdditionMode: false,
	isInCurriculumEditionSessionMoveMode: false,
	selectedSessionIndex: -1,
};
