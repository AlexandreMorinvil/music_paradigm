import config from '@/config';

const staticDirectory = '/static/';
const experimentResourceDirectory = '/experiment-resources/';

const sessions = '/sessions/';
const account = '/account/';
const experiments = '/experiments/';
const curriculums = '/curriculums/';
const users = '/users/';

const logSimple = '/log-simple/';
const logThorough = '/log-thorough/';

const storage = '/storage/';

export default {
	// Base URL
	baseUrl: function () {
		return config.apiUrl;
	},

	// File serving
	static: function (directory) {
		return config.apiUrl + staticDirectory + directory;
	},
	experimentResource: function (directory) {
		return config.apiUrl + experimentResourceDirectory + directory;
	},

	// API calls
	sessions: function (parameters) {
		return config.apiUrl + sessions + parameters;
	},
	account: function (parameters) {
		return config.apiUrl + account + parameters;
	},
	experiments: function (parameters) {
		return config.apiUrl + experiments + parameters;
	},
	curriculums: function (parameters) {
		return config.apiUrl + curriculums + parameters;
	},
	users: function (parameters) {
		return config.apiUrl + users + parameters;
	},
	logSimple: function (parameters) {
		return config.apiUrl + logSimple + parameters;
	},
	logThorough: function (parameters) {
		return config.apiUrl + logThorough + parameters;
	},
	storage: function (parameters) {
		return config.apiUrl + storage + parameters;
	},
};
