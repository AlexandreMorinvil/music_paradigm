import defaultResponseHandler from './defaultResponseHandler';
import { authHeader, url } from '@/_helpers';

const create = function (curriculum) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(''), requestOptions).then(handleResponse);
};

const getListAllHeaders = function () {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(''), requestOptions).then(handleResponse);
};

const getById = function (id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
};

const update = function (id, curriculum) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
};

const _delete = function (id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(handleResponse);
};

const handleResponse = function (reponse) {
	return defaultResponseHandler(reponse);
};

export const curriculumService = {
	create,
	getListAllHeaders,
	getById,
	update,
	delete: _delete,
};
