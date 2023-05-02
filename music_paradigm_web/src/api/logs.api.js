import { authHeader, url } from '@/_helpers';
import { csvFileResponseHandler, defaultResponseHandler, jsonFileResponseHandler } from './response-handler';

export const logsApi = {
	downloadTaskDataCsv,
	getTaskDataSummariesList,

	// TODO: Adjust the code below this line
	getSpecificUserThoroughLog,
	getSpecificAdminThoroughLog,
	getUserThoroughLogSummaryList,
	getAdminThoroughLogSummaryList,
	getUserThoroughLogCsv,
	getUserThoroughLogUnwoundCsv,
	getAdminThoroughLogCsv,
	getAdminThoroughLogUnwoundCsv,
	getUserThoroughLogJson,
	getAdminThoroughLogJson,
};

function downloadTaskDataCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.taskData('download-csv'), requestOptions)
		.then(csvFileResponseHandler.bind(null, mustSave));
}

function getTaskDataSummariesList(criteria) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ criteria }),
	};
	return fetch(url.taskData('get-summaries-list'), requestOptions).then(defaultResponseHandler);
}

// TODO: Ajust the code below this line

// Log selection
function getSpecificUserThoroughLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logThorough(['user-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

function getSpecificAdminThoroughLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logThorough(['admin-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

// Summary list
function getUserThoroughLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-summary-list'), requestOptions).then(defaultResponseHandler);
}

function getAdminThoroughLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-summary-list'), requestOptions).then(defaultResponseHandler);
}

// CSV
function getUserThoroughLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getUserThoroughLogUnwoundCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-csv-unwound'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getAdminThoroughLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getAdminThoroughLogUnwoundCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-csv-unwound'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

// JSON
function getUserThoroughLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}

function getAdminThoroughLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}
