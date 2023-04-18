export default {
    setUsersBatchCommand({ commit }, userBatchCommand) {
		commit('setUsersBatchCommand', userBatchCommand);
	},

	setUsersBatchCommandCurriculum({ commit }, curriculum) {
		commit('setUsersBatchCommandCurriculum', curriculum);
	}
};
