// Import config from 'config';
import{ authHeader } from'@/_helpers';
import config from'@/config';

export const resultService = {
	create
};

function create(result) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(result)
	};

	return fetch(`${config.apiUrl}/results/create`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if(!response.ok) {
			if(response.status === 401) {
				// // auto logout if 401 response returned from api
				// logout();
				location.reload(true); // Reload the page from the server
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
