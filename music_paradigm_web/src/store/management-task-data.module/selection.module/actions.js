import { logsApi } from '@/api';

export default {

	fetchAndSelectTaskDataEntryById({ commit, dispatch }, taskDataEntryId) {
		commit('indicateFetchingAndSelectingTaskDataEntryById', taskDataEntryId);
		return logsApi
			.getTaskDataEntryById(taskDataEntryId)
			.then(
				(response) => {
					const { taskDataEntry } = response;
					dispatch('setTaskDataEntrySelection', taskDataEntry);
				},
				(error) => {
					dispatch(
						'alert/setErrorAlert',
						`Failed to fetch the task data entry : ${error.message}`,
						{ root: true }
					);
				}
			).finally(() => {
				commit('indicateFetchingAndSelectingTaskDataEntryById', null);
			});
	},

	setTaskDataEntrySelection({ commit }, taskDataEntry) {
		commit('setTaskDataEntrySelection', taskDataEntry);
	},

	unsetTaskDataEntrySelection({ commit }) {
		commit('unsetTaskDataEntrySelection');
	},
};
