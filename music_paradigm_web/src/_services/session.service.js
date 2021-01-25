import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const sessionService = {
	initializeSession,
	concludeSession,
};

function initializeSession(associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	};
	return fetch(url.sessions('initialize-session' + '/' + associativeId), requestOptions).then(handleResponse);
}

function concludeSession(associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	};
	return fetch(url.sessions('conclude-session' + '/' + associativeId), requestOptions).then(handleResponse);
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
