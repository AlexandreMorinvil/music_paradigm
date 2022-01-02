import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './default-response-handler';

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
	return fetch(url.logSimple('user-summary-list'), requestOptions).then(handleResponse);
}

function getUserThoroughLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-summary-list'), requestOptions).then(handleResponse);
}

function getAdminSimpleLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-summary-list'), requestOptions).then(handleResponse);
}

function getAdminThoroughLogSummaryList(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-summary-list'), requestOptions).then(handleResponse);
}

// CSV
function getUserSimpleLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('user-csv'), requestOptions).then(handleResponse);
}

function getUserThoroughLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('user-csv'), requestOptions).then(handleResponse);
}

function getAdminSimpleLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logSimple('admin-csv'), requestOptions).then(handleResponse);
}

function getAdminThoroughLogCsv(criterias) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(criterias),
	};
	return fetch(url.logThorough('admin-csv'), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
