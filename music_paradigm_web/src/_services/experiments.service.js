import defaultResponseHandler from './defaultResponseHandler';
import { authHeader, url, validator } from '@/_helpers';

const validateExperiment = function (experiment) {
    return new Promise((resolve) => {
        validator.validateExperiment(experiment);
        resolve();
    })
}

const getListAllHeaders = function () {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(url.experiments(""), requestOptions).then(handleResponse);
}

const getDefinition = function (id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(url.experiments(`/description/${id}`), requestOptions).then(handleResponse);
}

const create = function (experiment) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(experiment)
    };
    return fetch(url.experiments(""), requestOptions).then(handleResponse);
}

const handleResponse = function (reponse) {
    return defaultResponseHandler(reponse);
}

export const experimentService = {
    validateExperiment,
    getListAllHeaders,
    getDefinition,
    create
};