<template>
    <div>
        <div>
            <div class="title-container">
                <span class="custom-title">座位指引</span>
                <div class="seat-tabs">
                    <el-button class="seat-item" size="mini" v-for="(item, index) in seatList" :key="item.id" @click="changeSeatTable(item)" :class="{'el-button--primary': isCurrent(item), 'is-plain': !isCurrent(item)}">
                        {{item.roomName}}
                        <el-dropdown class="tab-dropdown" trigger="click" @command="handleDropdown($event, index)">
                            <span><i class="more el-icon-more pull-right" ></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="preview">预览</el-dropdown-item>
                                <el-dropdown-item command="rename">重命名</el-dropdown-item>
                                <el-dropdown-item command="del">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-button>
                </div>
                <el-button class="add-btn" type="primary" circle icon="el-icon-plus" size="mini" @click="handleAdd"></el-button>
            </div>
        </div>
        <div class="seat-content">
            <div v-if="!currentHtml">
                <img class="default-seat" src="../../assets/images/seat-default.png" alt="">
            </div>
            <seat-table :content="currentHtml"></seat-table>
        </div>
        <div class="seat-buttons">
            <input class="custom-btn default-btn download-seat" type="button" value="下载模板" @click="download">
            <input class="custom-btn default-btn upload-seat" type="button" value="上传座位表" >
            <input class="custom-btn blue-btn publish-seat" type="button" value="发布应用" @click="publish" v-if="!isPublish">
            <input class="custom-btn default-btn publish-seat" type="button" value="取消发布" @click="cancelPublish" v-else>
            <!-- <el-button plain @click="download">下载模板</el-button> -->
            <!-- <el-button plain @click="upload">上传座位表</el-button> -->
            <!-- <el-upload
                :action="uploadUrl"
                :limit="1"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-change="uploadChange"
                :file-list="fileList"
                accept=".xlsx, .xls">
                上传座位表
            </el-upload> -->
            <!-- <el-button type="primary" @click="publish" v-if="!isPublish">发布应用</el-button>
            <el-button type="danger" @click="cancelPublish" v-else>取消发布</el-button> -->
        </div>
        <!-- 座位表 -->
        <el-dialog
        class="custom-dialog"
        :title="currentItem.roomName?'重命名座位表':'新建座位表'"
        :visible.sync="renameDialogVisible"
        width="400px">
            <label class="dialog-label" for="renameInput">重命名座位表</label>
            <el-input id="renameInput" v-model="newName" placeholder="请输入座位表名称" autocomplete="off" clearable @keyup.enter.native="submitName"></el-input>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="closeNameDialog">取消</el-button>
                <el-button type="primary" @click="submitName()">确定</el-button> -->
                <input type="button" class="custom-btn default-btn dialog-size" value="取消" @click="closeNameDialog">
                <input type="button" class="custom-btn blue-btn dialog-size" value="确定" @click="submitName()">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import seatTable from './seatTable.vue';
    import seatServ from '../../services/dataService/seat.serv.js'
    export default {
        data() {
            return {
                uploadUrl: "",
                seatList: [{
                    pkDetailId: 1,
                    roomName: "主会场"
                }, {
                    pkDetailId: 2,
                    roomName: "分会场"
                }],
                seatContent: "",
                renameDialogVisible: false,
                form: {},
                newName: "",
                currentItem: {}, //当前查看座位表
                // currentItem: this.seatList[0],
                renameItem: {},  //需要编辑名称的座位表
                currentHtml: "",
                nameErrMsg: "",
                fileList: [],
                isPublish: false
            }
        },
        components:{
            "seat-table": seatTable,
        },
        methods: {
            isCurrent(item) {
                return this.currentItem.pkDetailId == item.pkDetailId && this.currentItem.roomName == item.roomName
            },
            init() {
                this.fetchList()
                    .then(this.fetchDetail)
                    .catch(err=> {
                        this.$message.warning({
                            messsage: err.response.data.message,
                            showClose: true
                        })
                    })
            },
            fetchList() {
                return seatServ.getSeatList()
                    .then(res=> {
                        if(res.resStatus && res.resStatus.code == 0) {
                            this.seatList = res.result;
                            if(this.seatList.length) {
                                this.currentItem = this.seatList[0];
                            }
                        } else {
                            this.$message.warning({
                                messsage: res.resStatus.resMsg,
                                showClose: true
                            }) 
                        }
                    })
            }, 
            fetchDetail() {
                var id = this.currentItem.pkDetailId;
                if(!id) return;
                return seatServ.getSeatContentById(id)
                    .then(res=> {
                        if(res.resStatus && res.resStatus.code == 0) {
                            this.currentItem = res.result;
                        } else {
                            this.$message.warning({
                                messsage: res.resStatus.resMsg,
                                showClose: true
                            }) 
                        }
                    })
            },
            uploadSuccess(response, file ,fileList) {
                if(response.success) {
                    // this.hasLoadSuccess = true;
                    // this.fileId = response.result.fileId
                } else {
                    this.$message({
                        message: `上传失败`,
                        type: "warning",
                        showClose: true
                    });
                }
            },
            uploadError(error, file, fileList) {
                var message = "上传失败"
                if(error.status == 401) {
                    message = "令牌过期，请重新登录"
                    this.$router.replace("/login");
                }
                this.$message({
                    message: message,
                    type: "warning",
                    showClose: true
                });
            },
            uploadChange(file, fileList) {
                if(fileList.length > 1) {
                    // this.hasLoadSuccess = false;
                    fileList.shift();
                }
            },
            download() {
                return seatServ.downloadSeatTemplate();
            },
            // 发布应用
            publish() {
                return seatServ.publishSeat()
                    .then(res=> {
                        if(res.resStatus && res.resStatus.code == 0) {
                            this.$message.success({
                                message:"发布成功",
                                showClose: true
                            })
                        } else {
                            this.$message.warning({
                                message:res.resStatus.resMsg,
                                showClose: true
                            })
                        }
                    })
                    .catch(err=>{
                        this.$message.warning({
                            message:err.response.data.message,
                            showClose: true
                        })
                    })
                    .finally(() => {

                    })
            },
            // 取消发布
            cancelPublish(){
                return seatServ.cancelPublish()
                    .then(res=> {
                        if(res.resStatus && res.resStatus.code == 0) {
                            this.$message.success({
                                message:"取消发布成功",
                                showClose: true
                            })
                        } else {
                            this.$message.warning({
                                message:res.resStatus.resMsg,
                                showClose: true
                            })
                        }
                    })
                    .catch(err=> {
                        this.$message.warning({
                            message:err.response.data.message,
                            showClose: true
                        })
                    })
                    .finally(()=>{

                    })
            },
            // 处理下拉框
            handleDropdown(command, index) {
                switch(command) {
                    case "rename": 
                        this.handleRename(index)
                        break;
                    case "del": 
                        this.handleDelete(index)
                        break;
                    default: ;
                }
            },
            // 重命名
            handleRename(index) {
                var item = this.seatList[index];
                this.renameItem = item;
                this.newName = item.roomName;
                this.openNameDialog();
            },
            // 添加座位表
            handleAdd() {
                this.renameItem = {};
                this.newName = "";
                this.openNameDialog();
            },
            // 切换座位表
            changeSeatTable(item) {
                this.currentItem = item;
            },
            // 重命名
            submitName() {
                if(!this.newName) {
                    return this.$message.warning({
                        message:"座位表名称不能为空",
                        showClose: true
                    })
                }
                var isAdd = !this.renameItem.roomName;
                // 注释
                this.renameItem.roomName = this.newName;
                if(isAdd) {
                    this.seatList.push(this.renameItem);
                    this.currentItem = this.seatList[this.seatList.length-1]
                }
                this.closeNameDialog();
                return;
                // TODO:
                if(isAdd) {
                    return this.goAdd(this.newName)
                        .then(res => {
                            this.seatList.push(this.renameItem);
                            this.currentItem = this.seatList[this.seatList.length-1];
                            this.closeNameDialog();
                        })
                }
                return this.goRename({
                        ...this.renameItem,
                        roomName: this.newName
                    })
                    .then(res=> {
                        this.renameItem.roomName = this.newName;
                        this.closeNameDialog();
                    })
            },
            // 打开编辑名称弹框
            openNameDialog() {
                this.renameDialogVisible = true;
            },
            // 关闭编辑名称弹框
            closeNameDialog() {
                this.renameDialogVisible = false;
            },
            // 删除座位表
            handleDelete(index) {
                if(index < 0) return;
                this.$confirm('是否确认删除该座位表')
                    .then(_ => {
                        var item = this.seatList[index];
                        if(item.pkDetailId) {
                            this.goDelete(index)
                        }
                        else {
                            this.seatList.splice(index,1);
                        }
                    })
                    .catch(_ => {});
            },
            goAdd(item) {
                return seatServ.addSeat(item)
            },
            goRename() {
                return seatServ.renameSeat(item);
            },
            // 到后台删除
            goDelete(index) {
                let loading = this.$loading({
                    text: "删除中，请稍后...",
                    lock: true
                })
                var item = this.seatList[index];
                return seatServ.deleteSeatById(item.detailId)
                    .then(res => {
                        if(res.resStatus && res.resStatus.code == 0) {
                            this.$message.success({
                                messsage: "删除成功",
                                showClose: true
                            })
                            this.seatList.splice(index, 1);
                            // TODO:选中
                        } else {
                            this.$message.warning({
                                messsage: res.resStatus.resMsg,
                                showClose: true
                            }) 
                        }
                    })
                    .catch(err=> {
                        this.$message.warning({
                            messsage: err.response.data.message,
                            showClose: true
                        }) 
                    })
                    .finally(() => {
                        loading.close();
                    })
            }
        },
        mounted() {
            // this.init();
            this.currentItem = this.seatList[0];
        }
    }
</script>

<style scoped lang="less">
    .title-container {
        // padding: 1rem 0;
    }
    button.el-button--primary .more {
        color: #fff;
    }
    // tab切换
    .seat-tabs {
        margin-left: 1.2rem;
    }
    .seat-tabs, .seat-item {
        display: inline-block;
        // margin-right: .64rem;
        i.more {
            margin-left: .6rem;
        }
    }
    .add-btn {
        margin-left: .4rem;
    }
    .seat-content {
        min-height: .8rem;
    }
    .tab-dropdown {
        vertical-align: middle;
    }
    .seat-buttons {
        margin-top: 1.2rem;
    }
    img.default-seat {
        width: 100%;
    }
    .custom-btn {
        &.download-seat, &.upload-seat {
            width: 23%;
        }
        &.upload-seat {
            margin: 0 2%;
        }
        &.publish-seat {
            width: 50%;
        }
    }
    .dialog-label {
        font-weight: bold;
        font-size: 13px;
        color: #222;
        margin-bottom: 20px;
        display: inline-block;
    }
    .dialog-footer {
        input {
            width: 48%;
            &:first-child {
                margin-right: 4%;
            }
        }
    }
</style>