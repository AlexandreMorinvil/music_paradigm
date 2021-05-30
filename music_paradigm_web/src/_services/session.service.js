import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const sessionService = {
	initializeSession,
	concludeSession,
	saveSessionState,
	forgetSessionState,
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

function saveSessionState(associativeId, cursor, state) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ cursor: cursor, state: state }),
	};
	return fetch(url.sessions('save-session-state/' + associativeId), requestOptions).then(handleResponse);
}

function forgetSessionState(associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.sessions('forget-session-state/' + associativeId), requestOptions).then(handleResponse);
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
