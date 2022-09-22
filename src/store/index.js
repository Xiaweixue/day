import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/login'
import { getToken, setUserInfo, getUserInfo, setToken } from '../uslit/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    name: getUserInfo() || ''
  },
  getters: {
    token(state) {
      return state.token
    },
    name(state) {
      return state.name
    }
  },
  mutations: {
    tokenI(state, token) {
      state.token = token
      setToken(token)
    },
    userinfo(state, user) {
      state.name = user
      setUserInfo(user)
    }
  },
  actions: {
    async loginL({ commit }, loginForm) {
      // console.log(loginForm);
      try {
        // console.log(http);
        const response = await http.login(loginForm)
        // console.log(response, '111');
        commit('tokenI', response.data.token)
        return response.data.token
      } catch (e) {
        console.log(e.message);
      }

    },
    async userinfoL({ commit }) {
      try {
        const response = await http.userinfos()
        commit('userinfo', response.data.name)
        return response.data.name
      } catch (e) {
        console.log(e.massge);
      }
    }
  },
  modules: {
  }
})


