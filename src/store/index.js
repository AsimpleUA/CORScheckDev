import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    url: '',
    method: 'get'
  },
  mutations: {
    setUrl(state, data) {
      state.url = data.url;
      state.method = data.method;
    },
    addUrl(state, url) {
      state.list.unshift(url);
    }
  },
  actions: {
    async test({ commit }, data) {
      let message = '';
      let success = true;

      await axios[data.method](data.url).then(() => {
        message = 'Everything works';
      }).catch(err => {
        message = err.message;
        success = false;
      });

      commit('addUrl', data);

      return { message, success };
    }
  },
  modules: {
  }
})
