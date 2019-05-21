<template>
    <div class="agenda-container">
            <!-- <div class="title">会议议程安排</div> -->
            <div>
                <span class="custom-title">会议议程安排</span>
            </div>
            <div class="table">
                    <el-table 
                    border
                    :data="sortSchedule"
                    style="width: 100%">   
                        <el-table-column
                            label="时间"
                            min-width="20%"
                            align="center">
                             <template slot-scope="scope">
                                <span style="margin-left: 10px">{{scope.row.startTime|formatTime}}-{{scope.row.stopTime|formatTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="arrangement"
                            label="议程"
                            min-width="20%"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地点"
                             min-width="25%"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="participants"
                            label="参会人"
                            min-width="20%"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="15%"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                @click="editRow(scope.$index, scope.row)"
                                type="text"
                                size="small"
                                >
                                编辑
                                </el-button>
                                 <el-button
                                @click="deleteRow(scope.$index, sortSchedule)"
                                type="text"
                                size="small">
                                删除
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>  
            </div>
            <div class="buttonList">
                <el-button round class="butt" @click="downloadTemp()">下载模板</el-button>
                <el-upload 
                        ref="upload"
                        class="upload"
                        :action="uploadUrl()"
                        :on-success="handleSuccess"
                        :limit=1
                        :show-file-list="false"
                        method:="post"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain">
                        <el-button round class="but">上传议程安排</el-button>
                </el-upload>
                <el-button round class="butt" @click="addAgenda">添加议程</el-button>              
                <el-button type="primary" round class="generateButt"  @click="generateApplication()" v-if="!generateFlag">生成应用</el-button>
                <el-button type="primary" round class="generateButt"  @click="cancelGenerate()" v-else>取消发布</el-button>
            </div>
            <el-dialog  
                    title="添加议程"
                    :visible.sync="addDialogVisible"
                    width="60%"
                    :before-close="handleClose"
                    class="dialog custom-dialog">
                    <el-form ref="schedule" :model="schedule" :rules="rules" label-width="80px"> 
                        <el-form-item label="议程时间" class="dialogTime" prop="agendaTime">    
                                <el-date-picker
                                v-model="schedule.agendaTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="议程安排" prop="arrangement">
                            <el-input v-model="schedule.arrangement"></el-input>
                        </el-form-item>
                        <el-form-item label="地点">
                            <el-input v-model="schedule.address"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人" >
                            <el-input v-model="schedule.participants"></el-input>
                        </el-form-item>

                    </el-form>    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelDialog">取 消</el-button>
                        <el-button type="primary" @click="confirmAddAgenda(schedule)">确 定</el-button>
                    </span>
            </el-dialog>
            <el-dialog 
                    title="编辑议程"
                    :visible.sync="editDialogVisible"
                    width="60%"
                    :before-close="handleClose"
                    class="dialog custom-dialog">
                    <el-form ref="schedule" :model="schedule" label-width="80px"> 
                        <el-form-item label="议程时间" class="dialogTime">    
                                <el-date-picker
                                v-model="agendaTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="议程安排">
                            <el-input v-model="schedule.arrangement"></el-input>
                        </el-form-item>
                        <el-form-item label="地点">
                            <el-input v-model="schedule.address"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人">
                            <el-input v-model="schedule.participants"></el-input>
                        </el-form-item>

                    </el-form>    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelDialog">取 消</el-button>
                        <el-button type="primary" @click="editAgenda">确 定</el-button>
                    </span>
            </el-dialog>
            
    </div>
</template>
<script>
import agendaServ from '../../services/dataService/agenda.serv.js'
import moment from "moment";
export default {
    data(){
          const checkDate = (rule, value, callback) => {
              console.log('22', rule,value)
                if (!value) {
                    console.log('11',value)
                return callback(new Error('日期不能为空'));
            }else{
                callback()
            }
          }
        return{
            addDialogVisible: false,
            editDialogVisible:false,
            scheduleList: [{
                            startTime: 1554173485557,
                            stopTime:1554173485557,
                            arrangement: '嘉宾致辞1',
                            address: '上海市普陀区金沙江路11',
                            participants:'小组1',
                            pk_detail_id:1

                        }, 
                        {
                            startTime: 1554102896033,
                            stopTime:1554102896800,
                            arrangement: '嘉宾致辞2',
                            address: '上海市普陀区金沙江路 222',
                            participants:'小组2',
                            pk_detail_id:2
                        }, 
                        {
                            startTime: 1554102896203,
                            stopTime:1554102896800,
                            arrangement: '嘉宾致辞3',
                            address: '上海市普陀区金沙江路333',
                            participants:'小组3',
                            pk_detail_id:3
                        }, 
                        ],
            // sortSchedule:[],
            schedule:{
                agendaTime:[],
            }, 
            agendaTime:[], 
            appId:0,   
            generateFlag:true,   
               rules: {
                    agendaTime: [
                        {  required: true, message: '请选择日期', trigger: 'blur'}
                        ],
                    arrangement: [
                        { required: true, message: '请输入议程安排', trigger: 'blur' },
                    ],
               }
        }
    },
    watch:{
        schedule(value){
            // console.log(value,"watch agenda")   
             this.schedule.startTime = new Date(value.agendaTime[0]).getTime()   
             this.schedule.stopTime = new Date(value.agendaTime[1]).getTime()   
             
        }
    },

    filters:{
        formatTime(time){
            return moment(time).format('HH:mm')
        }
    },

    computed:{
         sortSchedule(){
            return this.sortByKey(this.scheduleList,'startTime');
         }
    },

    mounted(){
        this.getAgenda()
        // console.log('11',this.sortSchedule)
        
       
    },

    methods:{

        //获取议程表
        getAgenda(){
             agendaServ.getAgenda()
                .then(res=>{
                    if(res.resStatus&&res.resStatus.resCode == 0){
                        this.appId = result.appId
                        this.tableDate = res.result.scheduleList
                        this.generateFlag = res.result.isPublish
                    }else{
                        this.$message({
                                message: '获取会议议程失败',
                                type: 'error',
                                center: true,
                                showClose: true,
                                });
                    }
                })
               .catch(err=>{
                           this.$message({
                                message: '获取会议议程失败',
                                type: 'error',
                                center: true,
                                 showClose: true,
                                });
                        })
                .finally(()=>{
                    
                })
       },

       //下载模板
        downloadTemp(){
             agendaServ.downloadAgendaTemplate()
              .then(res=>{
              })
            .catch(err=>{
                })
            .finally(()=>{
            }) 
        },

        uploadUrl(){

        },

        handleSuccess(){
            aletr('111')

        },

        addAgenda(){
            this.addDialogVisible = true
            this.schedule = {}
        },

        //关闭dialog事件,清空schedule数据
        handleClose(done){
             this.schedule = {}
             this.agendaTime = []
             done()
        },

        //dialog取消按钮
        cancelDialog(){
             this.schedule = {}
             this.agendaTime = []
             this.addDialogVisible = false
             this.editDialogVisible = false
             console.log(this.sortSchedule)
             
        },

        //添加议程
        confirmAddAgenda(){
            // console.log(this.schedule)
            // console.log(this.agendaTime)
            //将新增的议程添加到议程表中
            //   this.sortSchedule.push(this.schedule)
            //   console.log(this.scheduleList)
             this.$refs['schedule'].validate((valid) => {
                   if(valid) {
                    //    console.log(this.schedule,'添加议程')
                        var obj = {
                            appId:this.appId,
                            schedule:                          
                                {
                                  arrangement:this.schedule.arrangement,
                                  startTime:this.schedule.startTime,
                                  stopTime:this.schedule.stopTime,
                                  address:this.schedule.address,
                                  participants:this.schedule.participants

                                }      
                        }
                        //  console.log(obj,'obj')
                        agendaServ.addAgenda(obj)
                        .then(res=>{
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
                        .catch(err=>{
                                this.$message({
                                        message: '提交失败',
                                        type: 'error',
                                        center: true,
                                        showClose: true,
                                        });
                            })
                        .finally(()=>{
                            this.schedule = {} 
                            this.agendaTime = []    
                            this.addDialogVisible = false    
                            
                        })
                  } else {
                            console.log(error);
                            return false;
                        }
                    });
        },
      
        //生成应用
        generateApplication(){
             var obj = {
                  appId : this.appId
             }
            agendaServ.generateApplication(obj)
              .then(res=>{
                if(res.resStatus && res.resStatus.resCode == 0){
                    this.$message({
                                message: '成功生成应用',
                                type: 'success',
                                center: true,
                                 showClose: true,
                                })
                    this.generateFlag = true            
                  }
                })
            .catch(err=>{
                    this.$message({
                                    message: '应用生成失败',
                                    type: 'error',
                                    center: true,
                                     showClose: true,
                                    });
                    })
            .finally(()=>{
            }) 
            
        },

         //取消发布  
        cancelGenerate(){
            alert('111')
             var obj = {
                  appId : this.appId
             }
            agendaServ.cancelApp(obj)
              .then(res=>{
                if(res.resStatus && res.resStatus.resCode == 0){
                    this.$message({
                                message: '成功取消应用',
                                type: 'success',
                                center: true,
                                 showClose: true,
                                })
                    this.generateFlag = false              
                   }
                })
            .catch(err=>{
                    this.$message({
                                    message: '取消应用失败',
                                    type: 'error',
                                    center: true,
                                     showClose: true,
                                    });
                    })
            .finally(()=>{
            }) 

        },

        //数组对象方法排序
        sortByKey(array,key){
		    return array.sort(function(a,b){
		      var x=a[key];
		      var y=b[key];
		      return ((x<y)?-1:((x>y)?1:0));
		   });
        },
         
         //删除议程
         deleteRow(index, sortSchedule){
            this.$confirm('此操作将永久删除此条议程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                            var obj = {
                                appId:this.appId,
                                schedule:sortSchedule[index]
                            }
                            agendaServ.deleteAgenda(obj)
                                .then(res=>{
                                    if(res.resStatus && res.resStatus.resCode == 0){
                                                this.$message({
                                                message: '删除成功',
                                                type: 'success',
                                                center: true,
                                                    showClose: true,
                                                });
                                        }else{
                                                this.$message({
                                                message: '删除失败',
                                                type: 'error',
                                                center: true,
                                                    showClose: true,
                                                });
                                        }
                                })
                                .catch(err=>{
                                        this.$message({
                                                message: '删除失败',
                                                type: 'error',
                                                center: true,
                                                    showClose: true,
                                                });
                                    })

                    }).catch(() => {
      
                });
             

         },
        //编辑打开dialog
        editRow(index,row){
            console.log(row)
            // console.log(sortSchedule[index])
            this.editDialogVisible = true
             let _obj = JSON.stringify(row)
             let objClone = JSON.parse(_obj)
             this.schedule = objClone
            // this.schedule.address = row.address
            // this.schedule.arrangement = row.arrangement
            // this.schedule.participants = row.participants
            // this.schedule.pk_detail_id = row.pk_detail_id
            // this.schedule.startTime = row.startTime
            // this.schedule.stopTime = row.stopTime
            this.agendaTime.push(this.schedule.startTime)
            this.agendaTime.push(this.schedule.stopTime)

        },
        //编辑确定
        editAgenda(){
            // console.log(this.schedule)
            // var obj = {
            //     appId:this.appId,
            //     schedule:this.schedule
            // }
            var obj = {
                appId:this.appId,
                schedule:                          
                    {
                        arrangement:this.schedule.arrangement,
                        startTime:this.schedule.startTime,
                        stopTime:this.schedule.stopTime,
                        address:this.schedule.address,
                        participants:this.schedule.participants

                    }      
            }
            // console.log(obj,'obj')
            agendaServ.editAgenda(obj)
                .then(res=>{
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
            .catch(err=>{
                    this.$message({
                            message: '提交失败',
                            type: 'error',
                            center: true,
                                showClose: true,
                            });
                })
            .finally(()=>{
                this.editDialogVisible = false        
                this.schedule = {}
                this.agendaTime = []
            })
          
        }



    }
 }
</script>
<style lang="less">
   .el-upload.el-upload--text{
       width: 100%;
   }
   .dialogTime .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
}
</style>

<style scoped lang="less">
     .agenda-container{
        //  padding-top:20px;
        //  .title{
        //     width: 90%;
        //     height: 25px;
        //     font-size:15px;
        //     font-family:SourceHanSansCN-Bold;
        //     font-weight:bold;
        //     color:rgba(34,34,34,1);
        //     line-height:25px;
        //     padding-left:10px;
        //     border-left:3px solid rgba(21,116,255,1) ;
        //     margin: 0 auto;
        //     text-align : left;

        //  }
         .table{
            //  width: 90%;
            //  margin: 20px auto;
         }
         .buttonList{
            //  width: 90%;
             margin: 0 auto;
             margin-top:100px;
             display: flex;
             display: -webkit-flex;
             flex-direction: row;
             justify-content:space-around;
             margin-bottom:50px;
             .butt{
                 width: 20%;
             }
             .upload{
                //  display: inline-block;
                 width: 20%;
                   .but{
                 width: 100%;
                 
                 
               }
             }
             .generateButt{
                 width: 30%;
             }
         }
     }
</style>