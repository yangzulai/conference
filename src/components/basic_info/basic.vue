<template>
    <div class="basic-container">
       <div class="name">
           <div class="verticla-line"></div>   
           <div class="label-name">会议名称:</div>
           <el-input type="text"  class="input-k" v-model="basicInfo.meetName"></el-input>
       </div>
       <div class="name">
           <div class="verticla-line"></div>   
           <div class="label-name">会议时间:</div>
            <el-date-picker 
                        class="timeClass"
                        v-model="basicInfo.meetDate"
                        type="datetime"
                        placeholder="选择日期时间">
             </el-date-picker>
     
       </div>
       <div class="name">
           <div class="verticla-line"></div>   
           <div class="label-name">会议地点:</div>
           <el-input type="text"  class="input-k" v-model="basicInfo.address"></el-input>
       </div>
        <div class="intro-name">
           <div class="verticla-line"></div>   
           <div class="label-name">会议介绍:</div>
       </div>
       <!-- <textarea class="intro-content" v-model="basicInfo.description"></textarea><br> -->
       <el-input
            class="intro-content"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="basicInfo.description">
            </el-input>
      <button class="confirm" @click="submitInfo()">确认</button>
    </div>
</template>
<script>
import basicServ from '../../services/dataService/basic_info.serv.js'
import msg from '../msg.vue'
// import {MessageBox} from 'mint-ui'
// import headerTab from '../headerTab.vue'
export default {
    data(){
        return{
            basicInfo:{
                meetName:'111',
                meetDate:'',
                address:'222'
            }
        }
    },
    components: {

    },
    mounted(){
        this.getInfo()
        
    },
    
    methods:{

          getInfo(){
              basicServ.getBasicInfo()
            .then(res=>{
                  if(res.resStatus.resCode == 0){
                      this.basicInfo = res.result.basicInfo
                  }
                  else{
                        this.$message({
                            message: '获取基本信息失败',
                            type: 'error',
                            center: true,
                                showClose: true,
                        });
                    }
              })
            .catch(err=>{
                this.$message({
                    message: '获取基本信息失败',
                    type: 'error',
                    center: true,
                        showClose: true,
                    });
            })
            .finally(()=>{
                
            })
          },
          submitInfo(){
                this.$confirm('确定提交信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                        var obj = this.basicInfo
                        obj.meetDate = new Date(obj.meetDate).getTime()
                        // console.log(obj)
                        basicServ.updateBasicInfo(obj).then(res=>{
                            if(res.resStatus && res.resStatus.resCode == 0){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success',
                                    center: true,
                                    showClose: true,
                                    });
                            }else{
                                this.$message({
                                    message: '提交失败',
                                    type: 'error',
                                    center: true,
                                    showClose: true,
                                    });
                            }
                    })
                })
                .catch(err=>{
                        this.$message({
                            message: '提交失败',
                            type: 'error',
                            center: true,
                                showClose: true,
                            });
                    })
            .finally(()=>{
                this.getInfo()
            })
               
          }
          
    },

}
</script>
<style> 
 html,body,div,p,span,input,textarea{
            margin:0;
            padding:0;
        } 
html,body{
    height: 100%;
}
.mint-msgbox-wrapper .mint-msgbox{
    width: 12rem;
}

.el-message-box__wrapper .el-message-box{
    width: 12rem;;
}
   
</style>

<style scoped lang="less">
   .basic-container{
    //    margin-left: -1rem;
       .name{
          display: flex;
          display: -webkit-flex;
          flex-direction: row;
           align-items:center;
           width:90%;
           height: 3rem;
           margin:0 0 0 1rem;
           border-bottom: solid 0.03rem rgba(157,158,158,1);
            .verticla-line{
                width:0.1rem;
                height:0.8rem;
                background-color:#1574FF;
                margin-right:0.4rem;
            
           }
           .label-name{
               width: 3.6rem;
                font-size:0.56rem;
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(34,34,34,1);
                // margin-right:0.4rem;
                
                
                
           }
           .timeClass{
               width:100%;
           }
           .input-k{
                // vertical-align:middle;
                // flex:auto;
                // height:1rem;
                color:rgba(34,34,34,1);
                font-size:0.56rem;
                font-family:SourceHanSansCN-Bold;
                // padding-left:0.1rem;
                
           }
         
       }
       .intro-name{
            display: flex;
            display: -webkit-flex;
            flex-direction: row;
            margin:0.9rem 0 1rem 1rem;
             .verticla-line{
                width:0.1rem;
                height:0.8rem;
                background-color:#1574FF;
                margin-right:0.4rem;
            
           }
           .label-name{
                font-size:0.56rem;
                font-family:SourceHanSansCN-Bold;
                font-weight:bold;
                color:rgba(34,34,34,1);        
           }
         
       }
          .intro-content{
            display:block;
            width:90%;
            // height:6.68rem;
            margin-left:1rem;
            background:rgba(245,245,245,1);
            border-radius:0.2rem;
            // float: left;
            margin-bottom: 3.2rem;
            // color:rgba(34,34,34,1);
            font-size:0.56rem;
            font-family:SourceHanSansCN-Bold;
            padding-left:0.1rem;
            text-overflow: hidden;
       }
       .confirm{
            width:8rem;
            height:2rem;
            background:rgba(21,116,255,1);
            box-shadow:0px 0.4rem 0.6rem 0px rgba(21,116,255,0.25);
            border-radius:1rem;
            border:none;
            font-size:0.6rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:0.7rem;
            display:block;
            margin:0 auto;
            margin-bottom: 50px;
            text-align:center;
       }
      
      
   }
</style>
