import http from '../uslit/http'

const login = (username,password)=>{
   return http({
        url:"user/login",
        method:'POST',
        data:{
            username,
            password
        }
    })
}


export default {
    login
}