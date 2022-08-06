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
import { glt } from './glt.module';
import { keyboard } from './keyboard.module';
import { log } from './log.module';
import { logs } from './logs.module';
import { management } from './management.module';
import { piano } from './piano.module';
import { pvt } from './pvt.module';
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
		glt,
		keyboard,
		log,
		logs,
		management,
		piano,
		pvt,
		question,
		session,
		soundGenerator,
		survey,
		users,
		writting,
	},
});
