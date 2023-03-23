import { usersApi } from '@/api';

export default {

	createUser({ commit, dispatch }, userToCreate) {
		commit('indicateIsCreatingUser', true);
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
				commit('indicateIsCreatingUser', false);
			});
	},

	createUserWithCurriculum({ commit, dispatch }, { user, curriculumId, assignedParameters }) {
		commit('indicateIsCreatingUserWithCurriculum', true);
		return usersApi
			.createUserWithCurriculum({ user, curriculumId, assignedParameters })
			.then(
				(response) => {
					const { user, ...progressionDetails } = response;
					dispatch('setSelectedUser', user);
					dispatch('progressions/setSelectedUserProgression', progressionDetails);
					dispatch('alert/setSuccessAlert', 'User creation sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsCreatingUserWithCurriculum', false);
			});
	},

	deleteUser({ commit, dispatch }, userId) {
		commit('indicateIsDeletingUser', true);
		return usersApi
			.deleteUser(userId)
			.then(
				() => {
					dispatch('unsetSelectedUser');
					dispatch('alert/setSuccessAlert', 'User deletion sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User deletion failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsDeletingUser', false);
			});
	},

	fetchUserSummariesList({ commit, dispatch }) {
		commit('indicateFetchingUserList', true);
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
				commit('indicateFetchingUserList', false);
			});
	},

	fetchAndSelectUserById({ commit, dispatch }, userId) {
		return usersApi.getUserById(userId).then(
			(selectedUserDetails) => {
				const { user, ...progressionDetails } = selectedUserDetails;
				dispatch('setSelectedUser', user);
				dispatch('progressions/setSelectedUserProgression', progressionDetails);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `User selection failed : ${error.message}`, { root: true });
			},
		);
	},

	getExistingUserGroupsList({ commit, dispatch }) {
		commit('indicateGettingExistingUserGroupsList', true);
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
				commit('indicateGettingExistingUserGroupsList', false);
			});
	},

	updateUser({ commit, dispatch }, { id, user }) {
		commit('indicateIsUpdatingUser', true);
		return usersApi
			.updateUserProfile(id, user)
			.then(
				(updatedUser) => {
					dispatch('setSelectedUser', updatedUser);
					dispatch('alert/setSuccessAlert', 'User update sucessful', { root: true });
					dispatch('fetchUserSummariesList');
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User update failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateIsUpdatingUser', false);
			});
	},

	refreshSelectedUserProfile({ commit, dispatch, getters }) {
		commit('indicateFetchingUser', true);
		return usersApi
			.getUserById(getters['selection/userSelectionId'])
			.then(
				({ user }) => {
					dispatch('setSelectedUser', user);
				},
				(error) => {
					dispatch('alert/setErrorAlert', `User profile refresh failed : ${error.message}`, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingUser', false);
			});
	},

	revertUserEditions({ dispatch, getters }) {
		dispatch('edition/setUserEdition', getters['selection/userSelection']);
	},

	setSelectedUser({ dispatch }, user) {
		dispatch('selection/setUserSelection', user);
		dispatch('edition/setUserEdition', user);
	},

	unsetSelectedUser({ dispatch }) {
		dispatch('progressions/unsetSelectedUserProgression');
		dispatch('selection/unsetUserSelection');
		dispatch('edition/unsetUserEdition');
	},
};
