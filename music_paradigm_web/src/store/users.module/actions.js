import { usersApi } from '@/api';

export default {
	unsetSelectedUser({ commit, dispatch }) {
		commit('unsetSelectedUser');
		dispatch('progressions/unsetSelectedProgression');
	},

	setSelectedUser({ commit, dispatch }, id) {
		return usersApi.getById(id).then(
			(selectedUser) => {
				commit('setSelectedUser', selectedUser.user);
				commit('progressions/setSelectedUserProgression', selectedUser.progression);
				commit('progressions/setSelectedUserProgressionSummary', selectedUser.progressionSummary);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
			},
		);
	},

	createUser({ commit, dispatch }, user) {
		commit('indicateCreateRequest');
		return usersApi
			.register(user)
			.then(
				(createdUser) => {
					commit('setSelectedUser', createdUser.user);
					commit('progressions/setSelectedUserProgression', createdUser.progression);
					commit('progressions/setSelectedUserProgressionSummary', createdUser.progressionSummary);
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
					dispatch('alert/setSuccessAlert', 'User update sucessful', { root: true });
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

	deleteUser({ commit, dispatch }, userId) {
		commit('indicateDeleteRequest');
		return usersApi
			.delete(userId)
			.then(
				() => {
					commit('unsetSelectedUser');
					dispatch('alert/setSuccessAlert', 'User deletion sucessful', { root: true });
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
					commit('progressions/setSelectedUserProgression', updatedUser.progression);
					commit('progressions/setSelectedUserProgressionSummary', updatedUser.progressionSummary);
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
};
