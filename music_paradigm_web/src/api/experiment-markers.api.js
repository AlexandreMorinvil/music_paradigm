import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const experimentMarkersApi = {
	resetTimeIndicated,
	delete: _delete,
};

function resetTimeIndicated(progressionId, associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experimentMarkers(progressionId + '/' + associativeId), requestOptions).then(defaultResponseHandler);
}

function _delete(progressionId, associativeId) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experimentMarkers(progressionId + '/' + associativeId), requestOptions).then(defaultResponseHandler);
}
