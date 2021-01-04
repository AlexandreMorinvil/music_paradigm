import config from '@/config';

const staticDirectory = '/static/';
const experimentRessourceDirectory = '/experiment-ressources/';

const adminSessions = '/admin-sessions/';
const account = '/account/';
const experiments = '/experiments/';
const curriculums = '/curriculums/';
const users = '/users/';

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
	adminSessions: function (parameters) {
		return config.apiUrl + adminSessions + parameters;
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
	storage: function (parameters) {
		return config.apiUrl + storage + parameters;
	},
};
