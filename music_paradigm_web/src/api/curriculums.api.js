import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const curriculumsApi = {
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
	return fetch(url.curriculums(''), requestOptions).then(defaultResponseHandler);
}

function getListAllHeaders() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(''), requestOptions).then(defaultResponseHandler);
}

function getById(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(defaultResponseHandler);
}

function update(id, curriculum) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(id), requestOptions).then(defaultResponseHandler);
}

function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(defaultResponseHandler);
}
