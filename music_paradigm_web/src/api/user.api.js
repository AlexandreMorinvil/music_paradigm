import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const usersApi = {
	createUser,
	createUserWithCurriculum,
	deleteUser,
	getExistingUserGroupsList,
	getUserSummariesList,
	getUserById,
	updateUserProfile,
};

function createUser(user) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users('create'), requestOptions).then(defaultResponseHandler);
}

function createUserWithCurriculum({ user, curriculumId, assignedParameters }) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ user, curriculumId, assignedParameters }),
	};
	return fetch(url.users('create-with-curriculum'), requestOptions).then(defaultResponseHandler);
}

function deleteUser(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(id), requestOptions).then(defaultResponseHandler);
}

function getUserSummariesList() {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(''), requestOptions).then(defaultResponseHandler);
}

function getUserById(id) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(['get-by-id', id]), requestOptions).then(defaultResponseHandler);
}

function getExistingUserGroupsList() {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users('existing-groups-list'), requestOptions).then(defaultResponseHandler);
}

function updateUserProfile(id, user) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users(id), requestOptions).then(defaultResponseHandler);
}