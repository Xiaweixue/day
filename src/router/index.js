import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/layout',
    redirect: '/home',
    name: 'layout',
    component: () => import('../layout'),
    children: [

      {
        path: '/home',
        name: 'home',

        meta: {
          title: '主页'
        },
        component: () => import('../views/home')
      }, {
        path: '/member',
        name: 'member',
        meta: {
          title: '会员管理'
        },
        component: () => import('../views/member')
      }, {
        path: '/supplier',
        name: 'supplier',
        meta: {
          title: '供应商管理'
        },
        component: () => import('../views/supplier')
      }, {
        path: '/merchandise',
        name: 'merchandise',
        meta: {
          title: '商品管理'
        },
        component: () => import('../views/merchandise')
      }, {
        path: '/staff',
        name: 'staff',
        meta: {
          title: '员工管理'
        },
        component: () => import('../views/staff')
      },

    ]
  }


]

const router = new VueRouter({
  routes
})

export default router
