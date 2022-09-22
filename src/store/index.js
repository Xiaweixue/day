import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/login'
import { getToken, setUserInfo, getUserInfo, setToken } from '../uslit/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //设置token变量
    token: getToken() || '',
    //设置用户信息变量
    name: getUserInfo() || ''
  },
  getters: {
    //设置计算属性缓存token方法
    token(state) {
      return state.token
    },
    //设置计算属性缓存用户信息方法
    name(state) {
      return state.name
    }
  },
  mutations: {
    //设置异步调用token方法
    tokenI(state, token) {
      state.token = token
      setToken(token)
    },
    //设置异步调用用户列表方法
    userinfo(state, user) {
      state.name = user
      setUserInfo(user)
    }
  },
  actions: {
    //用户登录
    async loginL({ commit }, loginForm) {
      try {
        //调用用户登录接口
        const response = await http.login(loginForm)
        //调用 mutations的方法存储token
        commit('tokenI', response.data.token)
        //把接口的token返回出去
        return response.data.token
      } catch (e) {
        //错误信息
        console.log(e.message);
      }

    },
    //用户信息
    async userinfoL({ commit }) {
      try {
        //调用用户信息接口
        const response = await http.userinfos()
        //调用 mutations的方法存储用户信息
        commit('userinfo', response.data.name)
        //把接口的用户信息返回出去
        return response.data.name
      } catch (e) {
        //错误信息
        console.log(e.massge);
      }
    },
    //退出登录
    async logout({ commit }) {
      //调用退出登录接口
      const pesponse = await http.Logout()
      console.log(pesponse.message);
      //调用 mutations的方法删除token和用户信息
      commit('tokenI', '')
      commit('userinfo', '')
      //把方法返回出去
      return pesponse
    }
  },
  modules: {
  }
})


