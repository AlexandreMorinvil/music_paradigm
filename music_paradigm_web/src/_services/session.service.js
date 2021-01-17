import { authHeader, url } from '@/_helpers';
import defaultResponseHandler from './defaultResponseHandler';

export const sessionService = {
	concludeSession,
};



function concludeSession(associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	};
	return fetch(url.sessions('/conclude-experiment' + '/' + associativeId), requestOptions).then(handleResponse);
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
