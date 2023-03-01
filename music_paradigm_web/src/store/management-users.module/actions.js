import { usersApi } from '@/api';

export default {

	assignCurriculum({ commit, dispatch }, { userId, curriculumParameters }) {
		commit('indicateAssignCurriculumRequest');
		return usersApi
			.assignCurriculum(userId, curriculumParameters)
			.then(
				(updatedUserDetails) => {
					const { user, ...progressionDetails } = updatedUserDetails;
					commit('setSelectedUser', user); // TODO : Delete once the code will have been updated
					dispatch('progressions/setSelectedUserProgression', progressionDetails);
					dispatch('alert/setSuccessAlert', 'Curriculum assignation sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `Curriculum assignation failed : ${error.message}`, { root: true });
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
					dispatch('setSelectedUser', user);

					// TODO : Delete once the code will have been updated
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
					dispatch('unsetSelectedUser');

					// TODO : Delete once the code will have been updated
					commit('unsetSelectedUser');
					dispatch('alert/setSuccessAlert', 'User deletion sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User deletion failed : ${error.message}`, { root: true });
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

	getSelectedUser({ commit, dispatch }, userId) {
		return usersApi.getById(userId).then(
			(selectedUserDetails) => {
				const { user, ...progressionDetails } = selectedUserDetails;
				dispatch('setSelectedUser', user);

				// TODO : Delete once the code will have been updated
				commit('setSelectedUser', user);
				dispatch('progressions/setSelectedUserProgression', progressionDetails);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
			},
		);
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
				(updatedUser) => {
					dispatch('setSelectedUser', updatedUser);

					// TODO : Delete once the code will have been updated
					commit('setSelectedUser', updatedUser); // TODO : Delete once the code will have been updated
					dispatch('alert/setSuccessAlert', 'User update sucessful', { root: true });
					dispatch('fetchAllUsersSummary');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User update failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateRequestEnd');
			});
	},

	setSelectedUser({ dispatch }, user) {
		dispatch('selection/setUserSelection', user);
		dispatch('edition/setUserEdition', user);
	},

	unsetSelectedUser({ commit, dispatch }) {
		dispatch('selection/unsetUserSelection');
		dispatch('edition/unsetUserEdition');
		commit('unsetSelectedUser'); // TODO : Delete this once the code will have been adjusted
		dispatch('progressions/unsetSelectedProgression'); // TODO : Update this once the code will have been adjusted
	},
};
