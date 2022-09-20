import $axios from '../uslit/http'

const login = (data) => {
    return $axios({
        url: "/admin/login",
        method: 'post',
        data
    })
}

const logOut=(data)=>{
     return $axios ({
        url:'/admin/logout',
        method:'post',
        data
     })
}


export default {
    login,
    logOut
}