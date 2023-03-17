import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const usersApi = {
	create,
	createWithCurriculum,
	delete: _delete,
	getById,
	getExistingUserGroupsList,
	getListAllSummaries,
	update,
};

function create(user) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users('create'), requestOptions).then(defaultResponseHandler);
}

function createWithCurriculum(user) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users('create-user-with-curriculum'), requestOptions).then(defaultResponseHandler);
}

function getListAllSummaries() {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(''), requestOptions).then(defaultResponseHandler);
}

function getById(id) {
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

function update(id, user) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users(id), requestOptions).then(defaultResponseHandler);
}

function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(id), requestOptions).then(defaultResponseHandler);
}
