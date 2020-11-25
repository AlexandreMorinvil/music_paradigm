import defaultResponseHandler from './defaultResponseHandler';
import { authHeader, url } from '@/_helpers';

export const adminSessionService = {
    createAdminSession,
};

function createAdminSession(sessionLogHeader) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionLogHeader)
    };
    return fetch(url.adminSessions("create"), requestOptions).then(handleResponse);
}

function handleResponse(reponse) {
    return defaultResponseHandler(reponse);
}