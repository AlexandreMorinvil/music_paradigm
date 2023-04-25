import { usersBatchCommandsApi } from "@/api/users-batch-command.api";

const formatFailuresListMessage = (failuresList) => failuresList.map(fail => `${fail[0]}: ${fail[1]}`).join(';\n')

export default {
	createUsersFromCsv({ commit, dispatch }, { csvFileContent }) {
		commit('indicateCreatingUsersFromCsv', true);
		return usersBatchCommandsApi
			.createUsersFromCsv(csvFileContent)
			.then(
				() => {
					dispatch('alert/setInformationAlert', 'Please review the users creation repport.', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateCreatingUsersFromCsv', false);
			});
	},

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


	executeUsersBatchCommandDeleteUsers({ commit, dispatch }, { idsList }) {
		commit('indicateExecutingBatchCommandDeleteUsers', true);
		return usersBatchCommandsApi
			.deleteUsers(idsList)
			.then(
				(response) => {
					const { successIdsList, failuresList } = response;
					console.log('successIdsList', successIdsList);
					console.log('failuresList', failuresList);
					dispatch(
						'managementUsers/listTableSelection/removeFromUsersListTableSelection',
						successIdsList,
						{ root: true }
					);
					if (failuresList.length > 0)
						dispatch(
							successIdsList.length > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Users deletion failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Users deleted sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandDeleteUsers', false);
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

	executeUsersBatchCommandRemoveAllTags({ commit, dispatch }, { idsList }) {
		commit('indicateExecutingBatchCommandRemoveAllTags', true);
		return usersBatchCommandsApi
			.removeAllTags(idsList)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Tags deletion failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Tags deleted sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandRemoveAllTags', false);
			});
	},

	executeUsersBatchCommandRemoveTag({ commit, dispatch }, { idsList, tag }) {
		commit('indicateExecutingBatchCommandRemoveTag', true);
		return usersBatchCommandsApi
			.removeTag(idsList, tag)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Tags deletion failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Tags deleted sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandRemoveTag', false);
			});
	},

	executeUsersBatchCommandSetGroup({ commit, dispatch }, { idsList, group }) {
		commit('indicateExecutingBatchCommandSetGroup', true);
		return usersBatchCommandsApi
			.setGroup(idsList, group)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Group edition failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Group edited sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandSetGroup', false);
			});
	},

	executeUsersBatchCommandSetNote({ commit, dispatch }, { idsList, note }) {
		commit('indicateExecutingBatchCommandSetNote', true);
		return usersBatchCommandsApi
			.setNote(idsList, note)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Notes edition failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Notes edited sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandSetNote', false);
			});
	},

	executeUsersBatchCommandSetPassword({ commit, dispatch }, { idsList, password, isPasswordSecret }) {
		commit('indicateExecutingBatchCommandSetPassword', true);
		return usersBatchCommandsApi
			.setPassword(idsList, password, isPasswordSecret)
			.then(
				(response) => {
					const { failuresList, successesCount } = response;
					if (failuresList.length > 0)
						dispatch(
							successesCount > 0 ? 'alert/setWarningAlert' : 'alert/setErrorAlert',
							`Password update failed for the following users:\n${formatFailuresListMessage(failuresList)}`,
							{ root: true });
					else
						dispatch('alert/setSuccessAlert', 'Passwords updated sucessfully', { root: true });
					dispatch('managementUsers/refreshAll', null, { root: true });
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExecutingBatchCommandSetPassword', false);
			});
	},

	getUsersCreationTemplateCsv({ commit, dispatch }, { curriculum }) {
		commit('indicateGettingUsersCreationTemplateCsv', true);
		return usersBatchCommandsApi
			.getUsersCreationTemplateCsv(curriculum)
			.then(
				() => { },
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateGettingUsersCreationTemplateCsv', false);
			});
	},

	setUsersBatchCommand({ commit }, userBatchCommand) {
		commit('setUsersBatchCommand', userBatchCommand);
	},

	setUsersBatchCommandCsvFile({ commit }, csvFile) {
		commit('setUsersBatchCommandCsvFile', csvFile);
	},

	setUsersBatchCommandCurriculum({ commit }, curriculum) {
		commit('setUsersBatchCommandCurriculum', curriculum);
	}
};
