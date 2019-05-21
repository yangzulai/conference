<template>
    <div id="conferenceNav">
        <div class="conferencebody">
            <ul>
                <li v-for="value in data" :key="value.key" @click="skip(value.routerName)">
                    <img :src="value.imgurl" alt="" class="leftIcon">
                    <span class="centerVal">{{value.label}}</span>
                    <span class="rightIcon el-icon-arrow-right"></span>
                </li>
            </ul>
        </div>
        <div class="conferencefoot">
            {{remark}}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data:[
                {
                    label:'基本信息',
                    imgurl:require('../../../assets/conferenceNav1.png'),
                    routerName:'basic',
                },
                {
                    label:'参会人员',
                    imgurl:require('../../../assets/conferenceNav2.png'),
                    routerName:'参会人员',
                },
                {
                    label:'会议资料',
                    imgurl:require('../../../assets/conferenceNav3.png'),
                    routerName:'会议资料',
                }
            ],
            remark:'注：移动端应用由于系统限制，只提供基础的会议组织功能，请登录PC端和飞信，进入会议组织应用完善相关组织事务。'
        }
    },
    methods:{
        skip(routerName){
            this.$router.push(routerName);
        }
    }
}
</script>
<style lang="less" scoped>
    #conferenceNav{
        padding:1rem 1rem 0.54rem 1rem;
        .conferencebody{
            ul{
                li{
                    font-size:0.6rem;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(34,34,34,1);
                    list-style: none;
                    height:3.2rem;
                    background:rgba(255,255,255,1);
                    box-shadow:0 0.1rem 0.36rem 0 rgba(0, 0, 0, 0.1);
                    border-radius:0.4rem;
                    padding-left:0.8rem;
                    line-height:3.2rem;
                    margin-bottom:0.6rem;
                    .leftIcon{
                        float:left;
                        margin-top:0.4rem;
                        display: inline-block;
                        width: 2.4rem;
                        height:2.4rem;
                    }
                    .centerVal{
                        float:left;
                        padding-left:0.6rem;
                    }
                    .rightIcon{
                        color:#C8C8C8;
                        line-height: 3.2rem;
                        height: 100%;
                        float:right;
                        font-size:0.8rem;
                        display: inline-block;
                        margin-right:0.4rem;
                    }
                }
            }
        }
        .conferencefoot{
            text-align:justify;
            padding-top:0.52rem;
            font-size:0.52rem;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
        }
    }
</style>

