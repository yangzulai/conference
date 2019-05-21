<template>
    <div class="status-bar">
        <span @click="routerBack">
            <i class="el-icon-back icon"></i>
        </span>
        <p class="title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: ""
            }
        },
        watch: {
            $route(to, from) {
                this.setTitle()
            }
        },  
        methods: {
            setTitle() {
                this.title = document.title;
            },
            routerBack() {
                this.$router.back();
            }
        },
        mounted() {
            this.setTitle();
        }
    }
</script>

<style scoped lang="less">
    .status-bar{
        // height: 40px;
        // line-height: 40px;
        font-size: 15px;
        font-weight: 400;
        color:rgba(51,51,51,1);
        background-color: #f5f5f5;
        padding: 15px 20px;
        .icon{
            vertical-align: middle;

        }
        .title{
            display: inline-block;
            vertical-align: middle;
            // line-height:40px;
            padding-left: 15px;
        }
    }
</style>