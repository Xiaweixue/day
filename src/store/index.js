import Vue from 'vue'
import Vuex from 'vuex'
//引入封装的axios方法
import http from '../api/login'
//引入封装的获取token和用户信息的方法 
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
      //返回出去
      return state.token
    },
    //设置计算属性缓存用户信息方法
    name(state) {
      //返回出去
      return state.name
    }
  },
  mutations: {
    //设置异步调用token方法
    tokenI(state, token) {
      //把token赋给state的变量
      state.token = token
      //给本地设置token
      setToken(token)
    },
    //设置异步调用用户列表方法
    userinfo(state, user) {
      //把用户信息赋给state的变量
      state.name = user
      //给本地设置用户信息
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
        console.log(response);
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
      //调用 mutations的方法清空token和用户信息
      commit('tokenI', '')
      commit('userinfo', '')
      //把方法返回出去
      return pesponse
    }
  },
  modules: {
  }
})


