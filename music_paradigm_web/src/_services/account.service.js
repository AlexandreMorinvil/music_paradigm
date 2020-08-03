import defaultResponseHandler from './defaultResponseHandler';
import { routerNavigation } from '@/_helpers';
import { url } from '@/_helpers';

export const accountService = {
    resumeLogin,
    login,
    logout
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
        body: JSON.stringify({ username, password })
    };

    return fetch(url.users("authenticate"), requestOptions)
        .then(handleResponse)
        .then(user => {
            // Login successful if there's a jwt token in the response
            if (user.token) {
                // Store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                routerNavigation.goToHomePage(user.role);
            }
            return user;
        });
}

function logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('user');
    routerNavigation.goToRootPage();
}

const handleResponse = function (reponse) {
    return defaultResponseHandler(reponse, (status) => {
        switch (status) {
            // Auto logout and reload page if 401 response returned from api
            case 401:
                logout();
                location.reload(true);
                break;

            default:
                break;
        }
    })
}
