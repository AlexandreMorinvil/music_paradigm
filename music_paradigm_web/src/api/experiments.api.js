import { authHeader, url, validator } from '@/_helpers';
import { defaultResponseHandler, zipFileResponseHandler } from './response-handler';

export const experimentsApi = {
	validateExperiment,
	downloadTasksZipFile,
	getListAllHeaders,
	getDefinition,
	create,
	update,
	delete: _delete,
};

// TODO: Put in a file outise the "API"
function validateExperiment(experiment) {
	return new Promise((resolve) => {
		validator.validateExperiment(experiment);
		resolve();
	});
}

function downloadTasksZipFile(mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experiments('task-list-zip-file'), requestOptions).then(zipFileResponseHandler.bind(null, mustSave));	
}

function getListAllHeaders() {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experiments(''), requestOptions).then(defaultResponseHandler);
}

function getDefinition(id) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experiments(`/description/${id}`), requestOptions).then(defaultResponseHandler);
}

function create(experiment) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(experiment),
	};
	return fetch(url.experiments(''), requestOptions).then(defaultResponseHandler);
}

function update(id, experiment) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(experiment),
	};
	return fetch(url.experiments(id), requestOptions).then(defaultResponseHandler);
}

function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experiments(id), requestOptions).then(defaultResponseHandler);
}
