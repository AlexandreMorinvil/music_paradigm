import defaultResponseHandler from './defaultResponseHandler';
import { authHeader, url } from '@/_helpers';

// const register = function(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//     return fetch(url.users("register"), requestOptions).then(handleResponse);
// }

const getListAllHeaders = function() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url.curriculums(""), requestOptions).then(handleResponse);
}

const getById = function (id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url.curriculums(id), requestOptions).then(handleResponse);
}

// const update = function (id, user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//     return fetch(url.users(id), requestOptions).then(handleResponse);
// }

// const _delete = function (id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };
//     return fetch(url.users(id), requestOptions).then(handleResponse);
// }

const handleResponse = function (reponse) {
    return defaultResponseHandler(reponse);
}

export const curriculumService = {
    // register,
    getListAllHeaders,
    getById,
    // update,
    // delete: _delete
};