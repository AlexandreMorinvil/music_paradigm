import { authHeader, url } from '@/_helpers';
import { csvFileResponseHandler, defaultResponseHandler, jsonFileResponseHandler } from './default-response-handler';

export const logsApi = {
	getSpecificUserSimpleLog,
	getSpecificUserThoroughLogLog,
	getSpecificAdminSimpleLogLog,
	getSpecificAdminThoroughLogLog,
	getUserSimpleLogSummaryList,
	getUserThoroughLogSummaryList,
	getAdminSimpleLogSummaryList,
	getAdminThoroughLogSummaryList,
	getUserSimpleLogCsv,
	getUserThoroughLogCsv,
	getAdminSimpleLogCsv,
	getAdminThoroughLogCsv,
	getUserSimpleLogJson,
	getUserThoroughLogJson,
	getAdminSimpleLogJson,
	getAdminThoroughLogJson,
};


// Log selection
function getSpecificUserSimpleLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logSimple(['user-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

function getSpecificUserThoroughLogLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logThorough(['user-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

function getSpecificAdminSimpleLogLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logSimple(['admin-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

function getSpecificAdminThoroughLogLog(logId) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logThorough(['admin-select-by-id', logId]), requestOptions).then(defaultResponseHandler);
}

// Summary list
function getUserSimpleLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('user-summary-list'), requestOptions).then(defaultResponseHandler);
}

function getUserThoroughLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-summary-list'), requestOptions).then(defaultResponseHandler);
}

function getAdminSimpleLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-summary-list'), requestOptions).then(defaultResponseHandler);
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
function getUserSimpleLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('user-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getUserThoroughLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getAdminSimpleLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

function getAdminThoroughLogCsv(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-csv'), requestOptions).then(csvFileResponseHandler.bind(null, mustSave));
}

// JSON
function getUserSimpleLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('user-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}

function getUserThoroughLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}

function getAdminSimpleLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}

function getAdminThoroughLogJson(criterias, mustSave = true) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-json'), requestOptions).then(jsonFileResponseHandler.bind(null, mustSave));
}
