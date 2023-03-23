export default {	
	editUserProgressionEditionCurriculumReference({ commit }, curriculumId) {
		commit('editUserProgressionEditionCurriculumReference', curriculumId);
		commit('clearUserProgressionEditionAssignedParameters');
	},

	setUserProgressionEdition({ commit }, progression) {
		commit('setUserProgressionEdition', progression);
	},

	unsetUserProgressionEdition({ commit }) {
		commit('unsetUserProgressionEdition');
	},
};
