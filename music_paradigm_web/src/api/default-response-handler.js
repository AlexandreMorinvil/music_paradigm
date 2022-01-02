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

export function csvFileResponseHandler(response, handleErrorStatus = () => { }) {
	return response.text().then((text) => {
		if (!response.ok) {
			handleErrorStatus(response.status);
			const error = response.statusText;
			return Promise.reject(new Error(error));
		}
		const csvContent = 'data:text/csv;charset=utf-8,' + text;
		const encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
		return csvContent;
	});
}
