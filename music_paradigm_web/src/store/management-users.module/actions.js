import { usersApi } from '@/api';

export default {

	createUser({ commit, dispatch }, userToCreate) {
		commit('indicateIsCreatingUser');
		return usersApi
			.createUser(userToCreate)
			.then(
				(response) => {
					const { user } = response;
					dispatch('setSelectedUser', user);
					dispatch('alert/setSuccessAlert', 'User creation sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsCreatingUserEnd');
			});
	},

	createUserWithCurriculum({ commit, dispatch }, { user, curriculumId, assignedParameters }) {
		commit('indicateIsCreatingUserWithCurriculum');
		return usersApi
			.createUserWithCurriculum({ user, curriculumId, assignedParameters })
			.then(
				(response) => {
					const { user, ...progressionDetails } = response;
					dispatch('setSelectedUser', user);
					dispatch('progressions/setSelectedUserProgression', progressionDetails);

					// TODO : Delete once the code will have been updated
					commit('setSelectedUser', user);

					dispatch('alert/setSuccessAlert', 'User creation sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsCreatingUserWithCurriculumEnd');
			});
	},

	deleteUser({ commit, dispatch }, userId) {
		commit('indicateIsDeletingUser');
		return usersApi
			.deleteUser(userId)
			.then(
				() => {
					dispatch('unsetSelectedUser');

					// TODO : Delete once the code will have been updated
					commit('unsetSelectedUser');
					dispatch('alert/setSuccessAlert', 'User deletion sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User deletion failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDeletingUserEnd');
			});
	},

	fetchUserSummariesList({ commit, dispatch }) {
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
		commit('indicateIsUpdatingUser');
		return usersApi
			.updateUserProfile(id, user)
			.then(
				(updatedUser) => {
					dispatch('setSelectedUser', updatedUser);

					// TODO : Delete once the code will have been updated
					commit('setSelectedUser', updatedUser); // TODO : Delete once the code will have been updated
					dispatch('alert/setSuccessAlert', 'User update sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User update failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsUpdatingUserEnd');
			});
	},

	revertUserEditions({ dispatch, getters }) {
		dispatch('edition/setUserEdition', getters['selection/userSelectionUser']);
	},

	setSelectedUser({ dispatch }, user) {
		dispatch('selection/setUserSelection', user);
		dispatch('edition/setUserEdition', user);
	},

	unsetSelectedUser({ commit, dispatch }) {
		dispatch('progressions/unsetSelectedUserProgression');
		dispatch('selection/unsetUserSelection');
		dispatch('edition/unsetUserEdition');

		commit('unsetSelectedUser'); // TODO : Delete this once the code will have been adjusted
		dispatch('progressions/unsetSelectedProgression'); // TODO : Update this once the code will have been adjusted
	},
};
