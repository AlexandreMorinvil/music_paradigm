import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { results } from './results.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    alert,
    account,
    users,
    results
  }
})
