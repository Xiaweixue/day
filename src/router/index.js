import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },{
    path :'/home',
    name:'home',
    component:()=>import('../views/home')
  }


]

const router = new VueRouter({
  routes
})

export default router
