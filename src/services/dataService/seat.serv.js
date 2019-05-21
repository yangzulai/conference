// 座位表

import request from '../axiosUtils';
import baseURL from '../baseUrl'

// 获取座位表列表
function getSeatList() {
    return request({
        method: "get",
        url: "/appseat/getSeatList",
        data: {}
    })
}

// 根据id获取座位表内容
function getSeatContentById(id) {
    // return request({
    //     method: "get",
    //     url: "/appseat/getSeat",
    //     params: {
    //         pkDetailId: id
    //     }
    // })
    return request({
        method: "get",
        url: "/Epms4bIv0.html",
    })
}

// 删除座位表
function deleteSeatById(id) {
    return request({
        method: "post",
        url: "/appseat/delSeat",
        data: {
            pkDetailId: id
        }
    })
}

// 生成座位表应用
function publishSeat(appId) {
    return request({
        method: "post",
        url: "/appseat/publishApp",
        data: {
            appId: appId
        }
    })
}

// 取消发布
function cancelPublish(appId) {
    return request({
        method: "post",
        url: "",
        data: {
            appId: appId
        }
    })
}

// 更新座位表
function updateSeat(data) {
    return request({
        method: "post",
        url: "/appseat/updateSeat",
        data: data
    })
}

// 新增座位表
function addSeat(data) {
    return request({
        method: "post",
        url: "/appseat/saveSeat",
        data: data
    })
}

// 重命名座位表(暂时没有)
function renameSeat(name, id) {
    return request({
        method: "put",
        url: "",
        data: {}
    })
}

// 下载座位表模板
function downloadSeatTemplate() {
    location.href = baseURL + "/appseat/downloadTemplate";
}

export default {
    getSeatList,
    getSeatContentById,
    publishSeat,
    cancelPublish,
    deleteSeatById,
    addSeat,
    updateSeat,
    renameSeat,
    downloadSeatTemplate
}