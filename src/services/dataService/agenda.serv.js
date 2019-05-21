// 会议议程

import request from '../axiosUtils';

// 获取会议议程
function getAgenda() {
    return request({
        method: "post",
        data: {
            
        },
        url: "/appschedule/getScheduleList"
    })
}

// 下载会议模板
function downloadAgendaTemplate() {
    // location.href ='/appschedule/downloadTemplate'
}

// 上传议程安排
function uploadAgenda(data) {
    return request({
        method: "put",
        data: {
            
        },
        url: "/appschedule/uploadScheduleList"
    })
}

//添加议程
function addAgenda(data) {
    return request({
        method: "post",
        data: {
            
        },
        url: "/appschedule/addSchedule"
    })
}

// 生成应用
function generateApplication(data) {
    return request({
        method: "post",
        data: {
            
        },
        url: "/appschedule/publishApp"
    })
}
//取消发布
function cancelApp(data) {
    return request({
        method: "post",
        data: {
            
        },
        url: "/apps/cancelApp"
    })
}
//编辑议程
function editAgenda(data) {
    return request({
        method: "post",
        data: {
            
        },
        url: "/appschedule/editSchedule"
    })
}
//删除议程
function deleteAgenda(data) {
    return request({
        method: "post",
        data: {
            
        },
        url: "/appschedule/removeSchedule"
    })
}


export default {
    getAgenda,
    downloadAgendaTemplate,
    uploadAgenda,
    addAgenda,
    generateApplication,
    cancelApp,
    editAgenda,
    deleteAgenda
}