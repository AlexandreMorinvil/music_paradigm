import { usersBatchCommandsApi } from "@/api/users-batch-command.api";

const formatFailuresListMessage = (failuresList) => failuresList.map(fail => `${fail[0]}: ${fail[1]}`).join(';\n')

export default {
	executeUsersBatchCommandAddTag({ commit, dispatch }, { idsList, tag }) {
		commit('indicateExecutingBatchCommandAddTag', true);
		return usersBatchCommandsApi
			.addTag(idsList, tag)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Note update failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Tags added sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandAddTag', false);
			});
	},

	executeUsersBatchCommandAppendToNote({ commit, dispatch }, { idsList, note }) {
		commit('indicateExecutingBatchCommandAppendToNote', true);
		return usersBatchCommandsApi
			.appendToNote(idsList, note)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Note update failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Notes updated sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandAppendToNote', false);
			});
	},

	executeUsersBatchCommandPrependToNote({ commit, dispatch }, { idsList, note }) {
		commit('indicateExecutingBatchCommandPrependToNote', true);
		return usersBatchCommandsApi
			.prependToNote(idsList, note)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Note update failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Notes updated sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandPrependToNote', false);
			});
	},

	setUsersBatchCommand({ commit }, userBatchCommand) {
		commit('setUsersBatchCommand', userBatchCommand);
	},

	setUsersBatchCommandCurriculum({ commit }, curriculum) {
		commit('setUsersBatchCommandCurriculum', curriculum);
	}
};
