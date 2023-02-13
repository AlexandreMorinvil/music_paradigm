import { downloadSave } from '@/_helpers';

/* eslint-disable no-empty-function */
export function defaultResponseHandler(response, handleErrorStatus = () => { }) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			handleErrorStatus(response.status);
			const error = (data && data.message) || response.statusText;
			return Promise.reject(new Error(error));
		}
		return data;
	});
}

export function csvFileResponseHandler(mustSave, response, handleErrorStatus = () => { }) {
	const filename = getFileNameFromResponse(response);
	return response.text().then((text) => {
		if (!response.ok) {
			handleErrorStatus(response.status);
			const error = response.statusText;
			return Promise.reject(new Error(error));
		}
		if (mustSave) downloadSave.saveCsv(text, filename);
		return text;
	});
}

export function jsonFileResponseHandler(mustSave, response, handleErrorStatus = () => { }) {
	const filename = getFileNameFromResponse(response);
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			handleErrorStatus(response.status);
			const error = response.statusText;
			return Promise.reject(new Error(error));
		}
		if (mustSave) downloadSave.saveJson(data, filename);
		return text;
	});
}

export function zipFileResponseHandler(mustSave, response, handleErrorStatus = () => { }) {
	const filename = getFileNameFromResponse(response);
	return response.text().then((data) => {
		if (!response.ok) {
			handleErrorStatus(response.status);
			const error = response.statusText;
			return Promise.reject(new Error(error));
		}
		if (mustSave) downloadSave.saveZip(data, filename);
	});
}

function getFileNameFromResponse(response) {
    let filename = '';
    const disposition = response.headers.get('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }
	return filename;
}
