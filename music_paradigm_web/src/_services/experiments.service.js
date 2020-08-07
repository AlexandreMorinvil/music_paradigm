import defaultResponseHandler from './defaultResponseHandler';
import { authHeader, url, validator } from '@/_helpers';

const validateExperiment = function (experiment) {
    return new Promise((resolve, reject) => {
        try {
            validator.validateExperiment(experiment);
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

const create = function (experiment) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(experiment)
    };
    console.log(requestOptions)
    return fetch(url.experiments("create"), requestOptions).then(handleResponse);
}

const handleResponse = function (reponse) {
    return defaultResponseHandler(reponse);
}

export const experimentService = {
    validateExperiment,
    create
};
