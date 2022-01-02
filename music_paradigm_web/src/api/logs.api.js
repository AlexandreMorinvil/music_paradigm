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
function getUserSimpleLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('user-csv'), requestOptions).then(csvFileResponseHandler);
}

function getUserThoroughLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-csv'), requestOptions).then(csvFileResponseHandler);
}

function getAdminSimpleLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-csv'), requestOptions).then(csvFileResponseHandler);
}

function getAdminThoroughLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-csv'), requestOptions).then(csvFileResponseHandler);
}
