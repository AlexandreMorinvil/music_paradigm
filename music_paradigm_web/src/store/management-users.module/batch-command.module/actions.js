import { usersBatchCommandsApi } from "@/api/users-batch-command.api";

export default {
	executeUsersBatchCommandAddTag({ commit, dispatch }, { idsList, tag }) {
		commit('indicateExecutingBatchCommandAddTag', true);
		return usersBatchCommandsApi
			.addTag(idsList, tag)
			.then(
				(response) => {
					dispatch('alert/setSuccessAlert', 'Tags added sucessfully', { root: true });
					dispatch('managementUsers/fetchUserSummariesList', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandAddTag', false);
			});
	},

	setUsersBatchCommand({ commit }, userBatchCommand) {
		commit('setUsersBatchCommand', userBatchCommand);
	},

	setUsersBatchCommandCurriculum({ commit }, curriculum) {
		commit('setUsersBatchCommandCurriculum', curriculum);
	}
};
