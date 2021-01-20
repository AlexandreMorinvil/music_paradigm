import config from '@/config';

const staticDirectory = '/static/';
const experimentRessourceDirectory = '/experiment-ressources/';

const sessions = '/sessions/';
const account = '/account/';
const experiments = '/experiments/';
const curriculums = '/curriculums/';
const users = '/users/';

const logSimple = '/log-simple/';

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
	experimentRessource: function (directory) {
		return config.apiUrl + experimentRessourceDirectory + directory;
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
	storage: function (parameters) {
		return config.apiUrl + storage + parameters;
	},
};
