export default {
	setCurriculumSelection({ commit }, curriculum) {
		commit('setCurriculumSelection', curriculum);
	},

	unsetCurriculumSelection({ commit }) {
		commit('unsetCurriculumSelection');
	},
};
