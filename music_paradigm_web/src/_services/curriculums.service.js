import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const curriculumService = {
	create,
	getListAllHeaders,
	getById,
	update,
	delete: _delete,
};

function create(curriculum) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(''), requestOptions).then(handleResponse);
}

function getListAllHeaders() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(''), requestOptions).then(handleResponse);
}

function getById(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
}

function update(id, curriculum) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
}

function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
