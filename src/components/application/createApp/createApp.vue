<template>
    <div id="createApp">
        <div class="createhead clearfix">
            <span class="custom-title">{{headLabel}}</span>
            <div class="headbtn">
                <button @click="toPreview">
                    <span class="headicon"></span>
                    预览效果
                </button>
            </div>
        </div>
        <div class="createlabel">
            <label for="apptitle"><span>*</span>应用标题：</label>
            <el-input class="input" v-model="appLabel" @input="setTitle" placeholder="建议最多六个中文字符" clearable=""></el-input>
            <span class="hint" v-show="isShowHint">标题字符超出数量限制！</span>
        </div>
        <div class="createbody clearfix">
            <div class="bodyleft">
                <label for=""><span>*</span>正文内容：</label>
            </div>
            <div class="bodyright">
                <VueUeditorWrap v-model="msg" :config="myConfig" @ready="getUE"></VueUeditorWrap>
            </div>
        </div>
        <div class="createfoot">
            <input class="custom-btn default-btn" type="button" value="返回" @click="goBack">
            <input class="custom-btn blue-btn" type="button" value="保存" @click="saveApp">
        </div>
        <preview :previewContent="previewContent" :appTitile="appLabel" ref="preview" ></preview>
    </div>
</template>
<script>
import '../../../assets/common.less';
import VueUeditorWrap from 'vue-ueditor-wrap';
import dataServ from '../../../services/dataService/application.serv.js';
import preview from '../../previewComponent/preview.vue'
export default {
    data() {
        return {
            UE:'',       //UE实例
            msg:'',      //UE编辑器html内容
            appId:'',    
            appLabel:'', //应用标题
            previewContent:'',//预览内容
            isShowHint:false,
            headLabel:'新建会议应用',
            myConfig: {
                autoHeightEnabled: false,
                initialFrameHeight: '200',
                initialFrameWidth: '100%',
                UEDITOR_HOME_URL: '/UEditor/',
                serverUrl: ''
            },
        }
    },
    components: {
        VueUeditorWrap,
        preview,
    },
    mounted(){
        this.getDetail();
        this.getUploadAddress();
    },
    computed:{
        newTitle(){
            return this.appLabel.replace(/\s+/g, "");
        },
        getBackground(){
            return this.UE.getContent().slice(this.UE.getContent().indexOf('#'),this.UE.getContent().indexOf('#')+7);
        },
        saveContent(){
            if(this.getBackground){
                return '<div style="min-height:414px;background:'+this.getBackground+';">'+this.msg+'</div>';
            }else{
                return this.msg;
            }
        }
    },
    methods:{
        getUE(editorInstance){
            //获取UE实例
            this.UE = editorInstance;
        },
        getDetail(){
            //获取编辑详情
            if(this.$route.query.appId){
                this.headLabel = '编辑应用';
                this.appId = this.$route.query.appId;
                this.detailServ();
            }
        },
        detailServ(){
            // dataServ.getCustomApp(this.appId).then(res=>{
            //         if(res.resStatus && res.resStatus.resCode == 0){
            //             this.msg = res.result.content;
            //             this.appLabel = res.result.titile;
            //         }else{
            //             this.$message({
            //                 message: res.resStatus.resMsg,
            //                 type: "warning",
            //                 showClose: true,
            //             })
            //         }
            //     })
            //     .catch(err=> {
            //         this.$message({
            //             message: "页面请求出错",
            //             type: "warning",
            //             showClose: true,
            //         })
            //     })
        },
        getUploadAddress(){
            //获取上传地址
            this.myConfig.serverUrl = 'http://35.201.165.105:8000/controller.php'
            // dataServ.getUploadAddress().then(res=>{
            //     if(res.resStatus && res.resStatus.resCode == 0){
            //         this.myConfig.serverUrl = res.result;
            //     }else{
            //      this.$message({
            //            message: res.resStatus.resMsg,
            //            type: "warning",
            //            showClose: true,
            //        })
            //    }
            // })
            // .catch(err=> {
            //     this.$message({
            //         message: "地址获取失败",
            //         type: "warning",
            //         showClose: true,
            //     })
            // })
        },
        toBack(){
            this.showPreview=false;
        },
        saveApp(){
            //保存当前应用或编辑应用
            if(this.appLabel==''||this.msg==''){
                this.$message({
                    type: 'warning',
                    message: '请完善必填内容',
                    showClose: true,
                });
                return ;
            }else if(this.isShowHint==true){
                this.$message({
                    type: 'warning',
                    message: '请重新填写标题',
                    showClose: true,
                });
                return ;
            }
            this.saveServ(this.saveContent)
        },
        saveServ(content){
            this.$message({
                type: 'success',
                message: '保存成功',
                showClose: true,
            });
            // dataServ.saveApplication(this.appLabel,content,this.appId).then(res=>{
            //     if(res.resStatus && res.resStatus.resCode == 0){
            //         this.$message({
            //             type: 'success',
            //             message: '保存成功',
            //             showClose: true,
            //         }); 
            //     }else{
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
        goBack(){
            this.$router.back();
        },
        setTitle(){
            this.appLabel = this.newTitle;
            this.appLabel.length>20 ? this.isShowHint = true : this.isShowHint = false;
        },
        toPreview(){
            //h5预览效果
            this.previewContent = this.saveContent;
            console.log(this.previewContent)
            this.$refs.preview.showPreview();
        },
    }
}
</script>
<style lang="less" scoped>
    #createApp{
        position:relative;
        height:100%;
        .createlabel{
            font-size:14px;
            padding-bottom:30px;
            font-weight:400;
            font-family:SourceHanSansCN-Regular;
            width: 100%;
            label{
                display: inline-block;
                width: 15%;
                color:#222;
                line-height:40px;
                text-align: right;
                padding-right:1%;
                span{
                    color:rgba(255,0,0,1);
                }
            }
            .input {
                width: 240px;
            }
            input{
                padding-left:16px;
                font-size:13px;
                outline: none;
                width:240px;
                height:40px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(227, 227, 227, 1);
                border-radius:8px;
            }
            .hint{
                display: inline-block;
                padding-left:16px;
                font-size:13px;    
                color:rgba(255,115,66,1);
                line-height:40px;
            }
        }
        .createhead{
            .headbtn{
                float:right;
                line-height:70px;
                button{
                    width:100px;
                    height:35px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(21, 116, 255, 1);
                    border-radius:5px;
                    outline: none;
                    font-size:14px;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(21,116,255,1);
                    cursor: pointer;
                    text-align:right;
                    padding-right:15px;
                    position: relative;
                    .headicon{
                        display: block;
                        background:url('../../../assets/createApp1.png') no-repeat;
                        width: 29px;
                        height:35px;
                        background-position:8px 12px;
                        position: absolute;
                        left:2px;
                        top:0px;
                    }
                    &:hover{
                        opacity: 0.8;
                    }
                }
            }
        }
        .createbody{
            font-size:12px !important;
            .bodyleft{
                float:left;
                width: 15%;
                label{
                    display: inline-block;
                    font-size:14px;
                    width: 100%;
                    color:#222;
                    text-align: right;
                    padding-right:1%;
                    line-height:14px;
                    span{
                        color:rgba(255,0,0,1);
                    }
                }
            }
            .bodyright{
                width:84%;
                height:100%;
                float:right;
            }
        }
        .createfoot{
            padding:15.5px 0px 15.5px 0px;
            input{
                &:nth-child(1){
                    width:30%;
                }
                &:nth-child(2){
                    float:right;
                    width:67%;
                }
            }
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

