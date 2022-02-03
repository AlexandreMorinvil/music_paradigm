import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const usersApi = {
	register,
	getListAllSummaries,
	getById,
	update,
	delete: _delete,
	assignCurriculum,
	assignParameters,
	assignAdjustments,
	resetProgression,
};

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};
	return fetch(url.users('register'), requestOptions).then(defaultResponseHandler);
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
	return fetch(url.users(id), requestOptions).then(defaultResponseHandler);
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

function assignCurriculum(userId, curriculumInformation) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculumInformation),
	};
	return fetch(url.users('assign-curriculum/' + userId), requestOptions).then(defaultResponseHandler);
}

function assignParameters(userId, parameters) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(parameters),
	};
	return fetch(url.users('assign-parameters/' + userId), requestOptions).then(defaultResponseHandler);
}

function assignAdjustments(userId, adjustments) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(adjustments),
	};
	return fetch(url.users('assign-adjustments/' + userId), requestOptions).then(defaultResponseHandler);
}

function resetProgression(userId) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users('reset-progression/' + userId), requestOptions).then(defaultResponseHandler);
}
