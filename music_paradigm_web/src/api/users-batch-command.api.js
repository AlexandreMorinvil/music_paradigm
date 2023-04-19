import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const usersBatchCommandsApi = {
	addTag,
	appendToNote,
	assignCurriculum,
	deleteUsers,
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
	return fetch(url.users(['batch-command','add-tag']), requestOptions).then(defaultResponseHandler);
}

function appendToNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command','append-to-note']), requestOptions).then(defaultResponseHandler);
}

function assignCurriculum(idsList, curriculum) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, curriculum }),
	};
	return fetch(url.users(['batch-command','assign-curriculum']), requestOptions).then(defaultResponseHandler);
}

function setPassword(idsList, password) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, password }),
	};
	return fetch(url.users(['batch-command','set-password']), requestOptions).then(defaultResponseHandler);
}

function setGroup(idsList, group) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, group }),
	};
	return fetch(url.users(['batch-command','set-group']), requestOptions).then(defaultResponseHandler);
}

function setNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command','set-note']), requestOptions).then(defaultResponseHandler);
}

function prependToNote(idsList, note) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, note }),
	};
	return fetch(url.users(['batch-command','prepend-to-note']), requestOptions).then(defaultResponseHandler);
}

function removeTag(idsList, tag) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList, tag }),
	};
	return fetch(url.users(['batch-command','remove-tag']), requestOptions).then(defaultResponseHandler);
}

function removeAllTags(idsList) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList }),
	};
	return fetch(url.users(['batch-command','remove-tag']), requestOptions).then(defaultResponseHandler);
}

function deleteUsers(idsList) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ idsList }),
	};
	return fetch(url.users(['batch-command', 'delete-users']), requestOptions).then(defaultResponseHandler);
}
