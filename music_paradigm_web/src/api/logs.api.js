import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const logsApi = {
	getUserSimpleLogSummaryList,
	getUserThoroughLogSummaryList
};

function getUserSimpleLogSummaryList({ userId, progressionId, associativeId }) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logSimple(['user-summary-list', userId, progressionId, associativeId]), requestOptions).then(handleResponse);
}

function getUserThoroughLogSummaryList({ userId, progressionId, associativeId }) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.logThorough(['user-summary-list', userId, progressionId, associativeId]), requestOptions).then(handleResponse);
}

// function addSimpleLogBlock(simpleLog) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { ...authHeader(), 'Content-Type': 'application/json' },
// 		body: JSON.stringify(simpleLog),
// 	};
// 	return fetch(url.logSimple('add-block'), requestOptions).then(handleResponse);
// }

function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
