import Vuex from 'vuex';
import Vue from 'vue';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    someObj: {},
    testStore: null,
    players: {},
  },
  actions,
  getters,
  mutations,
});