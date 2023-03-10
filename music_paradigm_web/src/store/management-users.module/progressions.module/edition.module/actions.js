export default {	
	editUserProgressionEditionCurriculumReference({ commit }, curriculumId) {
		commit('editUserProgressionEditionCurriculumReference', curriculumId);
	},

	setUserProgressionEdition({ commit }, progression) {
		commit('setUserProgressionEdition', progression);
	},

	unsetUserProgressionEdition({ commit }) {
		commit('unsetUserProgressionEdition');
	},
};
