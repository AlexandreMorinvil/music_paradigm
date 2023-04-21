import { authHeader, url } from '@/_helpers';
import { csvFileResponseHandler, defaultResponseHandler } from './response-handler';

export const usersBatchCommandsApi = {
	addTag,
	appendToNote,
	assignCurriculum,
	deleteUsers,
	getUsersCreationTemplateCsv,
	prependToNote,
	removeAllTags,
	removeTag,
	setGroup,
	setNote,
	setPassword,
};

function addTag(idsList, tag) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, tag }),
	};
	return fetch(url.users(['batch-command', 'add-tag']), requestOptions).then(defaultResponseHandler);
}

function appendToNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command', 'append-to-note']), requestOptions).then(defaultResponseHandler);
}

function assignCurriculum(idsList, curriculum) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, curriculum }),
	};
	return fetch(url.users(['batch-command', 'assign-curriculum']), requestOptions).then(defaultResponseHandler);
}

function deleteUsers(idsList) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList }),
	};
	return fetch(url.users(['batch-command', 'delete-users']), requestOptions).then(defaultResponseHandler);
}

function getUsersCreationTemplateCsv(curriculumId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.users(['batch-command', 'get-template-csv', curriculumId]), requestOptions)
		.then(csvFileResponseHandler.bind(null, true /* mustSave */));
}

function prependToNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command', 'prepend-to-note']), requestOptions).then(defaultResponseHandler);
}

function removeTag(idsList, tag) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, tag }),
	};
	return fetch(url.users(['batch-command', 'remove-tag']), requestOptions).then(defaultResponseHandler);
}

function removeAllTags(idsList) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList }),
	};
	return fetch(url.users(['batch-command', 'remove-all-tags']), requestOptions).then(defaultResponseHandler);
}

function setGroup(idsList, group) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, group }),
	};
	return fetch(url.users(['batch-command', 'set-group']), requestOptions).then(defaultResponseHandler);
}

function setNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command', 'set-note']), requestOptions).then(defaultResponseHandler);
}

function setPassword(idsList, password, isPasswordSecret) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, password, isPasswordSecret }),
	};
	return fetch(url.users(['batch-command', 'set-password']), requestOptions).then(defaultResponseHandler);
}