import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const curriculumsApi = {
	createCurriculum,
	deleteCurriculum,
	getCurriculumSummariesList,
	getCurriculumById,
	updateCurriculum,
};

function createCurriculum(curriculum) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(''), requestOptions).then(defaultResponseHandler);
}

function deleteCurriculum(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};
	return fetch(url.curriculums(id), requestOptions).then(defaultResponseHandler);
}

function getCurriculumSummariesList() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(''), requestOptions).then(defaultResponseHandler);
}

function getCurriculumById(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.curriculums(['get-by-id', id]), requestOptions).then(defaultResponseHandler);
}

function updateCurriculum(id, curriculum) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculum),
	};
	return fetch(url.curriculums(id), requestOptions).then(defaultResponseHandler);
}