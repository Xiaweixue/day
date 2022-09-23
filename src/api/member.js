import request from '../uslit/http'

const memberList = (page, size, data) => {
    return request({
        url: `/list/search/${page}/${size}`,
        method: 'post',
        data
    })
}

export default {
    memberList
}