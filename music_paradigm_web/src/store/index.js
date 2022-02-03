import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

import { account } from './account.module';
import { alert } from './alert.module';
import { curriculums } from './curriculums.module';
import { evaluation } from './evaluation.module';
import { experiment } from './experiment.module';
import { experiments } from './experiments.module';
import { keyboard } from './keyboard.module';
import { log } from './log.module';
import { logs } from './logs.module';
import { piano } from './piano.module';
import { question } from './question.module';
import { session } from './session.module';
import { soundGenerator } from './sound-generator.module';
import { survey } from './survey.module';
import { users } from './users.module';
import { writting } from './writting.module';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		alert,
		account,
		curriculums,
		evaluation,
		experiment,
		experiments,
		keyboard,
		log,
		logs,
		piano,
		question,
		session,
		soundGenerator,
		survey,
		users,
		writting,
	},
});
