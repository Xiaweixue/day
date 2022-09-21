import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  }


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
  } else {
    if (to.path == '/') {
      next()
    } else {
      next('/')
      alert('请登录后在访问')
    }
  }
})
export default router
