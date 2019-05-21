// 消息模块

import request from '../axiosUtils';

function sendMessage(members, content, contactWay) {
    return request({
        url: "",
        method: "post",
        data: {}
    })
}

export default {
    sendMessage
}