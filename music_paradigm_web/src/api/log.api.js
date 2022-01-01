import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './default-response-handler';

export const logApi = {
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
		body: JSON.stringify({ logHeader: logHeader }),
	};
	return fetch(url.logThorough('initialize-log'), requestOptions).then(handleResponse);
}

function addThoroughLogBlock(logHeader, block) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ logHeader: logHeader, block: block }),
	};
	return fetch(url.logThorough('add-log-block'), requestOptions).then(handleResponse);
}

function concludeThoroughLog(logHeader, logConclusion) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ logHeader: logHeader, logConclusion: logConclusion }),
	};
	return fetch(url.logThorough('conclude-log'), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
