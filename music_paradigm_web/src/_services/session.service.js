import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const sessionService = {
	initializeSession,
	concludeSession,
	saveSessionState,
};

function initializeSession(associativeId, associativeIdOrdinalNumber) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	};
	return fetch(url.sessions('initialize-session' + '/' + associativeId + '/' + associativeIdOrdinalNumber), requestOptions).then(handleResponse);
}

function concludeSession(associativeId, associativeIdOrdinalNumber, isInTimeUp = false) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ isInTimeUp: isInTimeUp }),
	};
	return fetch(url.sessions('conclude-session/' + associativeId + '/' + associativeIdOrdinalNumber), requestOptions).then(handleResponse);
}

function saveSessionState(associativeId, cursor, state, timeIndicated, progressRatio) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({
			cursor: cursor,
			state: state,
			timeIndicated: timeIndicated,
			progressRatio: progressRatio
		}),
	};
	return fetch(url.sessions('save-session-state/' + associativeId), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse, (status) => {
		switch (status) {
			// Auto logout and reload page if 401 response returned from api
			default:
				break;
		}
	});
}
