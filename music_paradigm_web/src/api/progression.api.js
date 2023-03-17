import { authHeader, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const progressionsApi = {
	assignAdjustments,
	assignCurriculum,
	assignParameters,
};

function assignAdjustments(userId, adjustments) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(adjustments),
	};
	return fetch(url.progressions('assign-adjustments/' + userId), requestOptions).then(defaultResponseHandler);
}

function assignCurriculum({ userId, curriculumId, assignedParameters }) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, curriculumId, assignedParameters }),
	};
	return fetch(url.progressions('assign-curriculum/'), requestOptions).then(defaultResponseHandler);
}

function assignParameters(userId, parameters) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(parameters),
	};
	return fetch(url.progressions('assign-parameters/' + userId), requestOptions).then(defaultResponseHandler);
}
