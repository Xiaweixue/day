import axios from "axios";
import { Loading, Message } from "element-ui";
import store from "@/store";
const exceptionMessage = {
    1000: '用户名或者密码发生错误',
    3000: ''
}
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: '1000'
})

service.interceptors.request.use(function (config) {
   

    // 获取vuex的token
    const token = store.getters.token
    // 当token存在的时候，则将token通过请求头发送给后台
    if (token) config.headers.authorization = "Bearer " + token
   
    return config;
}, function (error) {

    return Promise.reject(error);
});


service.interceptors.response.use(function (response) {

    if (response.status < 400) {
       

        //成功
        return response.data
    }
    //token过期
    if (response.status === 401) {
        return
    }
    // loadingInstance.close()
     //出现错误
    _showError(response.data.code, response.message)

    return response;
}, function (error) {

    return Promise.reject(error);
});

/**
 * 错误提示
 * @param errorCode
 * @param message
 * @private
 */
const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}
// 设置所有传参都用data
const services = (options) => {
    console.log(options);
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
    }
    return service(options)
}
export default services