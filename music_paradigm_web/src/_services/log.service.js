import defaultResponseHandler from'./defaultResponseHandler';
import{ authHeader, url } from'@/_helpers';

export const adminSessionService = {
	createSimpleLog,
	createAdminSession,
	addBlock
};

function createSimpleLog(simpleLog) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(simpleLog)
	};
	return fetch(url.adminSessions('create-simple/'), requestOptions).then(handleResponse);
}

function createAdminSession(sessionLogHeader) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(sessionLogHeader)
	};
	return fetch(url.adminSessions('create'), requestOptions).then(handleResponse);
}

function addBlock(id, block) {
	const requestOptions = {
		method: 'PATCH',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(block)
	};
	return fetch(url.adminSessions('add-block/' + id), requestOptions).then(handleResponse);
}


function handleResponse(reponse) {
	return defaultResponseHandler(reponse);
}
