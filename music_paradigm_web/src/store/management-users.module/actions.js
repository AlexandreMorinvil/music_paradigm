import { usersApi } from '@/api';

export default {

	assignCurriculum({ commit, dispatch }, { userId, curriculumParameters }) {
		commit('indicateAssignCurriculumRequest');
		return usersApi
			.assignCurriculum(userId, curriculumParameters)
			.then(
				(updatedUserDetails) => {
					const { user, ...progressionDetails } = updatedUserDetails;
					commit('setSelectedUser', user);
					dispatch('progressions/setSelectedUserProgression', progressionDetails);
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

	createUser({ commit, dispatch }, userToCreate) {
		commit('indicateCreateRequest');
		return usersApi
			.register(userToCreate)
			.then(
				(selectedUserDetails) => {
					const { user, ...progressionDetails } = selectedUserDetails;
					commit('setSelectedUser', user);
					dispatch('progressions/setSelectedUserProgression', progressionDetails);
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

	getExistingUserGroupsList({ commit, dispatch }) {
		commit('indicateGettingExistingUserGroupsList');
		return usersApi
			.getExistingUserGroupsList()
			.then(
				(userGroupsList) => {
					commit('setExistingUserGroupsList', userGroupsList);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateGettingExistingUserGroupsListEnd');
			});
	},

	updateUser({ commit, dispatch }, { id, user }) {
		commit('indicateUpdateRequest');
		return usersApi
			.update(id, user)
			.then(
				(updatedUserProfile) => {
					commit('setSelectedUser', updatedUserProfile);
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

	setSelectedUser({ commit, dispatch }, userId) {
		return usersApi.getById(userId).then(
			(selectedUserDetails) => {
				const { user, ...progressionDetails } = selectedUserDetails;
				commit('setSelectedUser', user);
				dispatch('progressions/setSelectedUserProgression', progressionDetails);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
			},
		);
	},

	unsetSelectedUser({ commit, dispatch }) {
		commit('unsetSelectedUser');
		dispatch('progressions/unsetSelectedProgression');
	},
};
