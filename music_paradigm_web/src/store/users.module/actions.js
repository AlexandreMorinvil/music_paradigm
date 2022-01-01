import { experimentMarkersApi, usersApi } from '@/api';

export default {
	fetchAllUsersSummary({ commit, dispatch }) {
		commit('indicateFetchingUserList');
		return usersApi
			.getListAllSummaries()
			.then(
				(usersSummaryList) => {
					commit('setSummariesList', usersSummaryList);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingUserListEnd');
			});
	},

	setSelectedUser({ commit, dispatch }, id) {
		return usersApi.getById(id).then(
			(selectedUser) => {
				commit('setSelectedUser', selectedUser.user);
				commit('setSelectedUserProgression', selectedUser.progression);
				commit('setSelectedUserProgressionSummary', selectedUser.progressionSummary);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
			},
		);
	},

	refreshSelectedUserProgression({ commit, dispatch, getters }) {
		return usersApi.getById(getters.userSelectedId).then(
			(selectedUser) => {
				commit('setSelectedUserProgression', selectedUser.progression);
				commit('setSelectedUserProgressionSummary', selectedUser.progressionSummary);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User progression refreshing failed : ${error.message}`, { root: true });
			},
		);
	},

	unsetSelectedUser({ commit }) {
		commit('unsetSelectedUser');
	},

	createUser({ commit, dispatch }, user) {
		commit('indicateCreateRequest');
		return usersApi
			.register(user)
			.then(
				(createdUser) => {
					commit('setSelectedUser', createdUser.user);
					commit('setSelectedUserProgression', createdUser.progression);
					commit('setSelectedUserProgressionSummary', createdUser.progressionSummary);
					dispatch('alert/setSuccessAlert', 'User creation sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateCreateRequestEnd');
			});
	},

	updateUser({ commit, dispatch }, { id, user }) {
		commit('indicateUpdateRequest');
		return usersApi
			.update(id, user)
			.then(
				(updatedUser) => {
					commit('setSelectedUser', updatedUser);
					dispatch('alert/setSuccessAlert', 'User update sucessful', {
						root: true,
					});
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateRequestEnd');
			});
	},

	deleteUser({ commit, dispatch }, id) {
		commit('indicateDeleteRequest');
		return usersApi
			.delete(id)
			.then(
				() => {
					commit('unsetSelectedUser');
					dispatch('alert/setSuccessAlert', 'User deletion sucessful', {
						root: true,
					});
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateDeleteRequestEnd');
			});
	},

	assignCurriculum({ commit, dispatch }, { userId, curriculumParameters }) {
		commit('indicateAssignCurriculumRequest');
		return usersApi
			.assignCurriculum(userId, curriculumParameters)
			.then(
				(updatedUser) => {
					commit('setSelectedUser', updatedUser.user);
					commit('setSelectedUserProgression', updatedUser.progression);
					commit('setSelectedUserProgressionSummary', updatedUser.progressionSummary);
					dispatch('alert/setSuccessAlert', 'Curriculum assignation sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateAssignCurriculumRequestEnd');
			});
	},

	updateParameters({ commit, dispatch }, { userId, assignedParameters }) {
		commit('indicateUpdateParametersRequest');
		return usersApi
			.assignParameters(userId, assignedParameters)
			.then(
				(updatedUser) => {
					commit('setSelectedUserProgression', updatedUser.progression);
					commit('setSelectedUserProgressionSummary', updatedUser.progressionSummary);
					dispatch('alert/setSuccessAlert', 'Parameter update sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateParametersRequestEnd');
			});
	},

	updateAdjustments({ commit, dispatch }, { userId, assignedAdjustments }) {
		commit('indicateUpdateAdjustmentsRequest');
		return usersApi
			.assignAdjustments(userId, assignedAdjustments)
			.then(
				(updatedUser) => {
					commit('setSelectedUserProgression', updatedUser.progression);
					commit('setSelectedUserProgressionSummary', updatedUser.progressionSummary);
					dispatch('alert/setSuccessAlert', 'Adjustments update sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateAdjustmentsRequestEnd');
			});
	},

	resetSessionTimeIndicated({ commit, dispatch, getters }, associativeId) {
		commit('indicateExperimentMarkerChangeRequest');
		return experimentMarkersApi
			.resetTimeIndicated(getters.userSelectedProgressionId, associativeId)
			.then(
				(progressionSummary) => {
					commit('setSelectedUserProgressionSummary', progressionSummary);
					dispatch('alert/setSuccessAlert', 'Session progress time indicated reset successful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExperimentMarkerChangeRequestEnd');
			});
	},

	resetSessionProgressKept({ commit, dispatch, getters }, associativeId) {
		commit('indicateExperimentMarkerChangeRequest');
		return experimentMarkersApi
			.delete(getters.userSelectedProgressionId, associativeId)
			.then(
				(progressionSummary) => {
					commit('setSelectedUserProgressionSummary', progressionSummary);
					dispatch('alert/setSuccessAlert', 'Session progress reset successful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateExperimentMarkerChangeRequestEnd');
			});
	},
};
