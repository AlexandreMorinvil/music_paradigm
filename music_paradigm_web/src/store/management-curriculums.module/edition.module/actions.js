export default {
	activateCurriculumEditionSessionAdditionMode({ commit, dispatch }) {
		dispatch('deactivateCurriculumEditionSessionMoveMode');
		commit('activateCurriculumEditionSessionAdditionMode');
	},

	activateCurriculumEditionSessionMoveMode({ commit, dispatch }) {
		dispatch('deactivateCurriculumEditionSessionAdditionMode');
		commit('activateCurriculumEditionSessionMoveMode');
	},

	addCurriculumEditionSession({ commit }, { indexPosition, isAddedBefore }) {
		commit('addCurriculumEditionSession', { indexPosition, isAddedBefore });
	},

	deactivateCurriculumEditionSessionAdditionMode({ commit }) {
		commit('deactivateCurriculumEditionSessionAdditionMode');
	},

	deactivateCurriculumEditionSessionMoveMode({ commit }) {
		commit('deactivateCurriculumEditionSessionMoveMode');
	},

	editCurriculumEditionSessionAssociativeId({ commit }, title) {
		commit('editCurriculumEditionSessionAssociativeId', title);
	},

	removeCurriculumEditionSession({ commit }) {
		commit('removeCurriculumEditionSession');
		commit('unsetCurriculumEditionSelectedSessionIndex');
	},

	moveCurriculumEditionSession({ commit }, indexTargetPosition) {
		commit('moveCurriculumEditionSession', indexTargetPosition);
	},

	resetCurriculumEdition({ dispatch }) {
		dispatch('deactivateCurriculumEditionSessionAdditionMode');
		dispatch('deactivateCurriculumEditionSessionMoveMode');
		dispatch('unsetCurriculumEditionSelectedSessionIndex');
	},

	setCurriculumEdition({ commit }, curriculum) {
		commit('setCurriculumEdition', curriculum);
	},

	setCurriculumEditionSelectedSessionIndex({ commit }, index) {
		commit('setCurriculumEditionSelectedSessionIndex', index);
	},

	unsetCurriculumEdition({ commit, dispatch }) {
		commit('unsetCurriculumEdition');
		dispatch('resetCurriculumEdition');
	},

	unsetCurriculumEditionSelectedSessionIndex({ commit }) {
		commit('unsetCurriculumEditionSelectedSessionIndex');
	},
};
