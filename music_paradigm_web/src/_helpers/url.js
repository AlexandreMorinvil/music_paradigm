import config from '@/config';

const staticDirectory = '/static/';
const experimentResourceDirectory = '/experiment-resources/';

const sessions = '/sessions/';
const account = '/account/';
const experiments = '/experiments/';
const curriculums = '/curriculums/';
const users = '/users/';
const experimentMarkers = '/experiment-markers/';

const logSimple = '/log-simple/';
const logThorough = '/log-thorough/';

const storage = '/storage/';

function addSlugs(baseUrl, route, slugs) {
	return baseUrl + route + (Array.isArray(slugs) ? slugs.join('/') : slugs);
}

export default {
	// API base URL
	baseUrl: function () {
		return config.apiUrl;
	},

	// File serving
	static: function (directory) {
		return addSlugs(config.apiUrl, staticDirectory, directory);
	},
	experimentResource: function (directory) {
		return addSlugs(config.apiUrl, experimentResourceDirectory, directory);
	},

	// API calls
	sessions: function (parameters) {
		return addSlugs(config.apiUrl, sessions, parameters);
	},
	account: function (parameters) {
		return addSlugs(config.apiUrl, account, parameters);
	},
	experiments: function (parameters) {
		return addSlugs(config.apiUrl, experiments, parameters);
	},
	curriculums: function (parameters) {
		return addSlugs(config.apiUrl, curriculums, parameters);
	},
	users: function (parameters) {
		return addSlugs(config.apiUrl, users, parameters);
	},
	experimentMarkers: function (parameters) {
		return addSlugs(config.apiUrl, experimentMarkers, parameters);
	},
	logSimple: function (parameters) {
		return addSlugs(config.apiUrl, logSimple, parameters);
	},
	logThorough: function (parameters) {
		return addSlugs(config.apiUrl, logThorough, parameters);
	},
	storage: function (parameters) {
		return addSlugs(config.apiUrl, storage, parameters);
	},
};
