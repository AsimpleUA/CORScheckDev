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

        if (err.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
          console.log(err.request);
        }
      });

      commit('addUrl', data);

      return { message, success };
    }
  },
  modules: {
  }
})
