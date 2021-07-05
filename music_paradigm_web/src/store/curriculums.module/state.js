import { defaultState } from '@/store-helper/curriculums.module-helper';

export default {
	status: {
		isFetchingCurriculumsList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
	},
	selection: defaultState.EMPTY_SELECTED_CURRICULUM(),
	curriculumsList: defaultState.EMPTY_CURRICULUMS_LIST(),
};
