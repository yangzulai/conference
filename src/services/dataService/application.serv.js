// 会议应用管理

import request from '../axiosUtils';

// 新建应用
function saveApplication(title,content,appId){
    appId = appId || '';
    return request({
        method: "post",
        url: "/appcustom/pubishApp",
        data: {
            title:title,
            content:content,
            appId:appId,
        }
    })
}

function getCustomApp(appId){
    return request({
        method: "post",
        url: "/appcustom/getCustomApp",
        data: {
            appId:appId,
        }
    })
}

function toPreview(appId){
    return request({
        method: "post",
        url: "/appcustom/preview",
        data: {
            appId:appId,
        }
    })
}

function getUploadAddress(){
    return request({
        method: "post",
        url: "/appcustom/upload",
        data: {},
    })
}


// 应用列表
function getApplicationList(){
    return request({
        method: "post",
        url: "/apps/getMeetAppList",
        data: {}
    })
}

function removeApplication(id){
    return request({
        method: "post",
        url: "/apps/removeMeetApp",
        data: {
            appId: id
        }
    })
}

function publishApplication(id) {
    return request({
        method: "post",
        url: "/apps/publishApp",
        data: {
            appId: id
        }
    })
}

function cancelPublishApplication(id) {
    return request({
        method: "post",
        url: "/apps/cancelApp",
        data: {
            appId: id
        }
    })
}

export default {
    getUploadAddress,
    getApplicationList,
    publishApplication,
    cancelPublishApplication,
    removeApplication,
    saveApplication,
    getCustomApp,
    toPreview,
}