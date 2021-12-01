import { defaultState } from '@/store-helper/curriculums.module-helper';

export default {
	curriculumSelectedId: (state) => {
		return state.selection._id;
	},

	curriculumSelectedTitle: (state) => {
		return state.selection.title;
	},

	curriculumSelectedLogType: (state) => {
		return state.selection.logType;
	},

	curriculumSelectedIsSequential: (state) => {
		return state.selection.isSequential;
	},

	curriculumSelectedExperiments: (state) => {
		return state.selection.experiments;
	},

	curriculumSelectedExperimentAtIndex: (state) => (index) => {
		if (Array.isArray(state.selection.experiments)) return state.selection.experiments[index] || {};
		else return {};
	},

	curriculumsList: (state) => {
		return state.curriculumsList;
	},

	// Template
	getBlankCurriculumExperiment: () => (index) => {
		return defaultState.BLANK_CURRICULUM_EXPERIMENT(index);
	},

	// Status
	hasSelectedCurriculum: (state) => {
		return Boolean(state.selection._id);
	},

	isFetchingCurriculumsList: (state) => {
		return state.status.isFetchingCurriculumsList;
	},
};
