import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const taskStateMarkersApi = {
	deleteTaskStateMarker,
	resetSessionTimer,
};

function deleteTaskStateMarker(progressionId, associativeId) {
	const requestOptions = {
		method: 'DELETE',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experimentMarkers(['delete', progressionId, associativeId]), requestOptions).then(defaultResponseHandler);
}

function resetSessionTimer(progressionId, associativeId) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};
	return fetch(url.experimentMarkers(['reset-timer', progressionId, associativeId]), requestOptions).then(defaultResponseHandler);
}
