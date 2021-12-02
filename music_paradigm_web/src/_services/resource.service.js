// Import config from 'config';
import { authHeader, url } from '@/_helpers';

export const resourceService = {
	fetchMidiFile,
};

function fetchMidiFile(midiFileName) {
	const requestOptions = {
		method: 'GET',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	};

	return fetch(url.experimentResource(midiFileName), requestOptions).then(function (response) {
		if (!response.ok) {
			throw new Error('HTTP error, status = ' + response.status);
		}
		return response.arrayBuffer();
	});
}
