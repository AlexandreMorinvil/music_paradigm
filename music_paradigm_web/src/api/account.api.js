import { authHeader, routerNavigation, url } from '@/_helpers';
import { defaultResponseHandler } from './response-handler';

export const accountApi = {
	resumeLogin,
	login,
	logout,
	fetchProgressionSummary,
	fetchDueExperimentSession,
	fetchSpecificExperimentSession,
};

function resumeLogin() {
	return new Promise(function (resolve) {
		const resumingUser = JSON.parse(localStorage.getItem('user'));
		if (resumingUser) resolve(resumingUser);
		else resolve(null);
	});
}

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	};

	return fetch(url.account('authenticate'), requestOptions)
		.then(handleResponse)
		.then((user) => {
			// Login successful if there's a jwt token in the response
			if (user.token) {
				// Store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));
				routerNavigation.goToHomePage(user.role);
			}
			return user;
		});
}

function fetchProgressionSummary() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.account('progression-summary'), requestOptions).then(handleResponse);
}

function fetchDueExperimentSession() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.account('due-experiment'), requestOptions).then(handleResponse);
}

function fetchSpecificExperimentSession(associativeId, associativeIdOrdinalNumber = 0) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(url.account('specific-experiment' + '/' + associativeId + '/' + associativeIdOrdinalNumber), requestOptions).then(handleResponse);
}

function logout() {
	// Remove user from local storage to log user out
	localStorage.removeItem('user');
	routerNavigation.goToRootPage();
}

function handleResponse(reponse) {
	return defaultResponseHandler(reponse, (status) => {
		switch (status) {
			// Auto logout and reload page if 401 response returned from api
			// eslint-disable-next-line no-magic-numbers
			case 401:
				logout();
				location.reload(true);
				break;

			default:
				break;
		}
	});
}
