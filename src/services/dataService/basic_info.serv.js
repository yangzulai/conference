// 基本信息
import request from '../axiosUtils';

function getBasicInfo() {
    return request({
        method: "post",
        url: "/appbasic/getBasicInfo",
        data: {}
    })
}

function updateBasicInfo(data) {
    return request({
        method: "post",
        url: "/appbasic/updateBasicInfo",
        data: data
    })
}

export default {
    getBasicInfo,
    updateBasicInfo
}