import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const logApi = {
	initializeThoroughLog,
	addThoroughLogBlock,
	concludeThoroughLog,
};

function initializeThoroughLog(logHeader) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ logHeader: logHeader }),
	};
	return fetch(url.logThorough('initialize-log'), requestOptions).then(defaultResponseHandler);
}

function addThoroughLogBlock(logHeader, block) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ logHeader: logHeader, block: block }),
	};
	return fetch(url.logThorough('add-log-block'), requestOptions).then(defaultResponseHandler);
}

function concludeThoroughLog(logHeader, logConclusion) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ logHeader: logHeader, logConclusion: logConclusion }),
	};
	return fetch(url.logThorough('conclude-log'), requestOptions).then(defaultResponseHandler);
}
