export default {	
	editCurriculumEditionLogType({ commit }, logType) {
		commit('editCurriculumEditionLogType', logType);
	},
	
	editCurriculumEditionIsSequential({ commit }, isSequential) {
		commit('editCurriculumEditionIsSequential', isSequential);
	},
	
	editCurriculumEditionCurriculumTasks({ commit }, tasks) {
		commit('editCurriculumEditionCurriculumTasks', tasks);
	},
	
	editCurriculumEditionTitle({ commit }, title) {
		commit('editCurriculumEditionTitle', title);
	},

	editCurriculumEditionSessionAssociativeId({ commit }, title) {
		commit('editCurriculumEditionSessionAssociativeId', title);
	},

	editCurriculumEditionSessionDelayInDays({ commit }, delayInDays) {
		commit('editCurriculumEditionSessionDelayInDays', delayInDays);
	},

	editCurriculumEditionSessionIsCompletionLimited({ commit }, isCompletionLimited) {
		commit('editCurriculumEditionSessionIsCompletionLimited', isCompletionLimited);
	},

	editCurriculumEditionSessionIsUniqueInDay({ commit }, isUniqueInDay) {
		commit('editCurriculumEditionSessionIsUniqueInDay', isUniqueInDay);
	},

	editCurriculumEditionSessionTaskReference({ commit }, taskReference) {
		commit('editCurriculumEditionSessionTaskReference', taskReference);
	},

	editCurriculumEditionSessionTitle({ commit }, title) {
		commit('editCurriculumEditionSessionTitle', title);
	},

	editCurriculumEditionSessionText({ commit }, text) {
		commit('editCurriculumEditionSessionText', text);
	},

	setCurriculumEdition({ commit }, curriculum) {
		commit('setCurriculumEdition', curriculum);
	},
	setCurriculumEditionSelectedSessionIndex({commit}, index) {
		commit('setCurriculumEditionSelectedSessionIndex', index);
	},

	unsetCurriculumEdition({ commit }) {
		commit('unsetCurriculumEdition');
		commit('unsetCurriculumEditionSelectedSessionIndex');
	},

	unsetCurriculumEditionSelectedSessionIndex({commit}) {
		commit('unsetCurriculumEditionSelectedSessionIndex');
	},
};
