import $axios from '../uslit/http'

const login = (data) => {
    return $axios({
        url: "/admin/login",
        method: 'post',
        data
    })
}


export default {
    login
}