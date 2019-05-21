<template>
  <div id="manageApp">
        <div class="managehead clearfix">
            <h1 class="custom-title">会议应用</h1>
        </div>
        <div class="managebody">
            <ul class="managelist">
                <li v-for="(value,idx) in manageData" :key="idx" :appid="value.appId">
                    <span>{{value.appName}}</span>
                    <div class="btnlist">
                        <input class="custom-btn mini-size default-btn" type="button" value="预览" @click="toPreview(value.appId)">
                        <input class="custom-btn mini-size default-btn" type="button" value="编辑" @click="toEdit(value.appId,value.appType)">
                        <input type="button" value="删除" @click="toDelete(value.appId)" class="custom-btn mini-size red-btn" v-show="false" v-if="value.isPublished==0">
                        <input class="custom-btn mini-size red-btn" type="button" value="删除" @click="toDelete(value.appId)" v-else-if="value.appType==4">
                        <input type="button" value="删除" @click="toDelete(value.appId)" class="custom-btn mini-size red-btn" v-show="false" v-else>
                        <input class="custom-btn mini-size blue-btn published" type="button" value="发布应用" @click="toPublish(value.appId)" v-if="value.isPublished==1">
                        <input class="custom-btn mini-size default-btn cancelpublished"  type="button" value="取消发布" @click="cancelPublish(value.appId)"  v-else-if="value.isPublished==0">
                    </div>
                </li>
            </ul>
        </div>
        <div class="managefoot">
            <input  class="custom-btn blue-btn" type="button" value="新建会议应用" @click="createApp">
        </div>
        <preview :previewContent="previewContent" :appTitile="appTitile" ref="preview"></preview>
  </div>
</template>
<script>
import dataServ from '../../../services/dataService/application.serv.js';
import preview from '../../previewComponent/preview.vue'
export default {
    data() {
        return {
            manageData:[],
            previewContent:'',//预览内容
            appTitile:'',//预览标题
        }
    },
    mounted(){
        this.getData();
        // let loadingInstance = this.$loading({
        //     text: '加载中...',
        //     background: 'rgba(0, 0, 0, 0.3)'
        // });
        // setTimeout(()=>{
        //     loadingInstance.close();
        //     loadingInstance = null;
        // },1000)
    },
    components: {
        preview,
    },
    methods:{
        getData(){
            //获取应用列表
            var arr = [
                { 
                    "appId": '0',
                    "appName": "会议介绍",
                    "appType": '0',
                    "isPublished": '1',//0发布;1未发布
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '2',
                    "appName": "座位指引",
                    "appType": '1',
                    "isPublished": '1',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '3',
                    "appName": "会议议程",
                    "appType": '2',
                    "isPublished": '0',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '4',
                    "appName": "城市介绍",
                    "appType": '3',
                    "isPublished": '0',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '5',
                    "appName": "自定义应用1",
                    "appType": '4',
                    "isPublished": '1',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '6',
                    "appName": "自定义应用2",
                    "appType": '4',
                    "isPublished": '1',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
                { 
                    "appId": '7',
                    "appName": "自定义应用3",
                    "appType": '4',
                    "isPublished": '0',
                    "createTime": 'xxxx',
                    "updateTime": 'xxxx',
                },
		    ]
            this.manageData = arr;
            // dataServ.getApplicationList().then(res=>{
            //    if(res.resStatus && res.resStatus.resCode == 0){
            //         this.manageData = res.result.appsList;
            //    }else{
            //      this.$message({
            //           message: res.resStatus.resMsg,
            //            type: "warning",
            //            showClose: true,
            //        })
            //    }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "页面请求出错",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        toPreview(appid){
            //预览
            this.appTitile = "应用标题"
            this.previewContent = '<p style="text-align:center;font-size:14px;">H5手机预览效果</p>'
            this.$refs.preview.showPreview()
            // dataServ.toPreview(appid).then(res=>{
                // if(res.resStatus && res.resStatus.resCode == 0){
                //     this.previewContent = res.result.content;
                //     this.$refs.preview.showPreview();
                // }else{
                //     this.$message({
                //         message: res.resStatus.resMsg,
                //         type: "warning",
                //         showClose: true,
                //     })
                // }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "页面请求出错",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        toEdit(appid,apptype){
            //编辑
            switch(apptype){
                case '0':
                    this.$router.push('basic');
                    break;
                case '1':
                    this.$router.push('seat');
                    break;
                case '2':
                    this.$router.push('agenda');
                    break;
                case '3':
                    this.$router.push('城市介绍');
                    break;
                case '4':
                    this.$router.push({path:'createApp',query:{appId:appid}});
                    break;
            }
        },
        toDelete(appid){
            //删除
            this.$confirm('此操作将永久删除此应用, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteServ(appid)
            }).catch(() => {
                // this.$message({
                // type: 'info',
                // message: '已取消删除',
                // showClose:true,
                // })
            });
        },
        deleteServ(appid){
            this.$message({
                type: 'success',
                message: '删除成功',
                showClose:true,
            });
            // dataServ.removeApplication(appid).then(res=>{
            //     if(res.resStatus && res.resStatus.resCode == 0){
                        // this.$message({
                        //     type: 'success',
                        //     message: '删除成功',
                        //     showClose:true,
                        // });
            //         this.getData();
            //     }else{
            //         this.$message({
            //             message: res.resStatus.resMsg,
            //             type: "warning",
            //             showClose: true,
            //         })
            //     }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "页面请求出错",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        toPublish(appid){
            //发布应用
            // dataServ.publishApplication(appid).then(res=>{
                // if(res.resStatus && res.resStatus.resCode == 0){
                //     this.$message({
                //         type: 'success',
                //         message: '发布成功',
                //     }); 
                //     this.getData();
                // }else{
                //     this.$message({
                //         message: res.resStatus.resMsg,
                //         type: "warning",
                //         showClose: true,
                //     })
                // }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "页面请求出错",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        cancelPublish(appid){
            //取消发布
            // dataServ.cancelPublishApplication(appid).then(res=>{
                // if(res.resStatus && res.resStatus.resCode == 0){
                //     this.$message({
                //         type: 'success',
                //         message: '取消成功',
                //     }); 
                //     this.getData();
                // }else{
                //     this.$message({
                //         message: res.resStatus.resMsg,
                //         type: "warning",
                //         showClose: true,
                //     })
                // }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "页面请求出错",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        createApp(){
            //返回
            this.$router.push('createApp');
        }
    }
}
</script>
<style lang="less" scoped>
    #manageApp{
        overflow: auto;
        height:100%;
        .managebody{
            .managelist{
                overflow: auto;
                li{
                    list-style: none;
                    font-size:14px;
                    height:50px;
                    line-height:50px;
                    border:1px solid rgba(227, 227, 227, 1);
                    background:rgba(255,255,255,1);
                    border-radius:8px;
                    margin-bottom:12px;
                    span{
                        margin-left:20px;
                    }
                    .btnlist{
                        float:right;
                        input{
                            margin-right:8px;
                            width:60px;
                            &:hover{
                                opacity: 0.8;
                            }
                        }
                        .published{
                            width:80px;
                        }
                        .cancelpublished{
                            width:80px;
                        }
                    }
                }
            }
        }
        .managefoot{
            padding-top:22px;
            padding-bottom:34px;
        }
    }
    .clearfix:after{
        /* 清除浮动 */
        content:"";
        display: block;
        height: 0;
        clear:both;
        overflow:hidden;
        visibility:hidden;
        zoom:1;
    }
</style>