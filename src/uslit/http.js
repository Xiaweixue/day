import axios from "axios";
import { Loading } from "element-ui";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: '1000'
})

let loadingInstance = null
service.interceptors.request.use(function (config) {
    // loadingInstance = Loading.service({ fullscreen: true })
    //获取token
    config.headers.token=window.sessionStorage.getItem('token')
    return config;
}, function (error) {

    return Promise.reject(error);
});


service.interceptors.response.use(function (response) {
    // loadingInstance.close()
    return response;
}, function (error) {

    return Promise.reject(error);
});
const services = (options) => {
    console.log(options);
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
    }
    return service(options)
}
export default services