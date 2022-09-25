import request from '../uslit/http'
//获取信息、查询信息接口
const memberList = (page, size, data) => {
    return request({
        url: `/staff/${page}/${size}`,
        method: 'post',
        data
    })
}
//删除接口
const memberDelete = (id) => {
    return request({
        url: `/member/${id}`,
        method: 'delete'
    })
}

//添加
const addinginterfaces = (data) => {
    return request({
        url: "/member",
        method: 'post',
        data
    })
}
//编辑
const editinginterface = (id) => {
    return request({
        url: `/staff/${id}`,
        method: 'get'
    })
}
//编辑更新
const Editsuccess = (id, data) => {
    return request({
        url: `/member/${id}`,
        method: 'put',
        data
    })
}
export default {
    memberList,
    memberDelete,
    addinginterfaces,
    editinginterface,
    Editsuccess
}