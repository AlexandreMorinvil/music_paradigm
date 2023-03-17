import config from '@/config';

const staticDirectory = '/static/';
const experimentResourceDirectory = '/experiment-resources/';

const account = '/account/';
const curriculums = '/curriculums/';
const experiments = '/experiments/';
const experimentMarkers = '/experiment-markers/';
const progressions = '/progressions/'
const sessions = '/sessions/';
const users = '/users/';

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
	account: function (parameters) {
		return addSlugs(config.apiUrl, account, parameters);
	},
	curriculums: function (parameters) {
		return addSlugs(config.apiUrl, curriculums, parameters);
	},
	experiments: function (parameters) {
		return addSlugs(config.apiUrl, experiments, parameters);
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
	progressions: function (parameters) {
		return addSlugs(config.apiUrl, progressions, parameters);
	},
	sessions: function (parameters) {
		return addSlugs(config.apiUrl, sessions, parameters);
	},
	storage: function (parameters) {
		return addSlugs(config.apiUrl, storage, parameters);
	},
	users: function (parameters) {
		return addSlugs(config.apiUrl, users, parameters);
	},
};
