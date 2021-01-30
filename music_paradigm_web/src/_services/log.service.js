import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const logService = {
	addSimpleLogBlock,
	initializeThoroughLog,
	addThoroughLogBlock,
	concludeThoroughLog,
};

function addSimpleLogBlock(simpleLog) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(simpleLog),
	};
	return fetch(url.logSimple('add-block'), requestOptions).then(handleResponse);
}

function initializeThoroughLog(logHeader) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(logHeader),
	};
	return fetch(url.logThorough('initialize-log'), requestOptions).then(handleResponse);
}

function addThoroughLogBlock(logId, block) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(block),
	};
	return fetch(url.adminSessions('add-log-block/' + logId), requestOptions).then(handleResponse);
}

function concludeThoroughLog(logId, logConclusion) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(logConclusion),
	};
	return fetch(url.adminSessions('add-log-block/' + logId), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
