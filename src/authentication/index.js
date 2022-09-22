//配置路由导航守卫
//引入路由
import router from '../router'
//引入vuex
import store from '../store'
//设置路由到访守卫
router.beforeEach(async (to, from, next) => {
    // console.log(store);
    //获取vuex里边存储的token赋给变量
    const token = store.getters.token
    //判断是否存在token
    if (token) {
        //如果有token的情况下路由要去到登录页面然他返回当前页面
        if (to.path === '/') { //如果在登录页面
            next(from.path)//返回当前页面
        } else { //如果不在登录页面

            // 获取用户信息并赋给变量
            let name = store.getters.name
            if (name === "") { //判断用户是否为空 如果为空 调用获取用户信息方法
                console.log(123);
                const userinfo = await store.dispatch('userinfoL')
                if (userinfo) { // 判断调用方法
                    next() //调用成功就放行
                } else {
                    next('/') //否则就返回登录页面
                }
            } else {
                next() //用户信息不为空就直接放行
            }
        }

    } else {
        if (to.path === '/') { // 如果路由要跳转登录页面就放行
            next()
        } else {  // 否则就返回登录页面
            next('/')
        }
    }
})


