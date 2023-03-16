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
	return fetch(url.users('assign-adjustments/' + userId), requestOptions).then(defaultResponseHandler);
}

function assignCurriculum(userId, curriculumInformation) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(curriculumInformation),
	};
	return fetch(url.users('assign-curriculum/' + userId), requestOptions).then(defaultResponseHandler);
}

function assignParameters(userId, parameters) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(parameters),
	};
	return fetch(url.users('assign-parameters/' + userId), requestOptions).then(defaultResponseHandler);
}
