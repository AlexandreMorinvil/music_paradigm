import { authHeader, url } from '@/_helpers';
import { csvFileResponseHandler, defaultResponseHandler } from './default-response-handler';

export const logsApi = {
	getUserSimpleLogSummaryList,
	getUserThoroughLogSummaryList,
	getAdminSimpleLogSummaryList,
	getAdminThoroughLogSummaryList,
	getUserSimpleLogCsv,
	getUserThoroughLogCsv,
	getAdminSimpleLogCsv,
	getAdminThoroughLogCsv,

};

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
