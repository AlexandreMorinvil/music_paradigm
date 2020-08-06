import defaultResponseHandler from './defaultResponseHandler';
import { url, validator } from '@/_helpers';


let validateExperiment = function(experiment) {
    return new Promise((resolve, reject) => {
        try {
            validator.validateExperiment(experiment);
            resolve();
        } catch (e) {
            reject(e.message);
        }
    })
}

// const handleResponse = function (reponse) {
//     return defaultResponseHandler(reponse);
// }


export const experimentService = {
    validateExperiment
};
