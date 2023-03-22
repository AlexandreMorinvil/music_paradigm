import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const progressionsApi = {
	assignCurriculum,
	assignParameters,
	assignSessionAdjustments,
};

function assignSessionAdjustments(progressionId, sessionIdentifier, adjustments) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({
			sessionIdentifier: sessionIdentifier,
			adjustments: adjustments,
		}),
	};
	return fetch(url.progressions(['assign-session-adjustments', progressionId]), requestOptions).then(defaultResponseHandler);
}

function assignCurriculum({ userId, curriculumId, assignedParameters }) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, curriculumId, assignedParameters }),
	};
	return fetch(url.progressions('assign-curriculum/'), requestOptions).then(defaultResponseHandler);
}

function assignParameters(progressionId, assignedParameters) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ assignedParameters }),
	};
	return fetch(url.progressions(['assign-parameters', progressionId]), requestOptions).then(defaultResponseHandler);
}
