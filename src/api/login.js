import request from '../uslit/http'
//登录接口
const login=(data)=>{
   return request({
        url:'/admin/login',
        method:'post',
        data
    })
}
//用户身份
const userinfos=()=>{
    return request({
        url:'/admin/admin',
        method:'get',
      
    })
}



export default {
   login,
   userinfos

}