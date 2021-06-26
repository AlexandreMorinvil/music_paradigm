import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const userService = {
	register,
	getListAllHeaders,
	getById,
	update,
	delete: _delete,
	assignCurriculum,
	resetProgression,
};

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users('register'), requestOptions).then(handleResponse);
}

function getListAllHeaders() {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(''), requestOptions).then(handleResponse);
}

function getById(id) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(id), requestOptions).then(handleResponse);
}

function update(id, user) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users(id), requestOptions).then(handleResponse);
}

function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(id), requestOptions).then(handleResponse);
}

function assignCurriculum(userId, assignedParameters) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(assignedParameters),
	};
	return fetch(url.users('assign-curriculum/' + userId), requestOptions).then(handleResponse);
}

function resetProgression(userId) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users('reset-progression/' + userId), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
