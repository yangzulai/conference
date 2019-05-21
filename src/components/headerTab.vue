<template>
    <div class="header-bar">
        <div class="container">
            <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" @select="handleClick"
            active-text-color="#1574FF"
            text-color="#333">
                <el-menu-item :index="idx.toString()" v-for="(item, idx) in navList" :key="item.name">{{item.label}}
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
     data() {
      return {
        activeIndex: "",
        navList: [{
            label: "基本信息",
            name: "basic",
            path: "/basic"
        }, {
            label: "会议议程",
            path: "/agenda",
            name: "agenda"
        },{
            label: "座位指引",
            path: "/seat",
            name: "seat"
        }, {
            label: "会议应用",
            path: "/manageApp",
            name: "manageApp"
        }, {
            label: "会议材料",
            path: "http://www.baidu.com",
            name: "material",
            external: true
        }]
      };
    },
    watch: {
    },
    methods:{
        handleClick(idx) {
            this.activeIndex = idx;
            var item = this.navList[idx];
            if(!item.external) {
                return this.$router.replace(item.path);
            }
            // location.open = item.path;
            return;
        },
        setDefaultIndex() {
            var index = _.findIndex(this.navList, {name: this.$route.name});
            this.activeIndex = index.toString();
        }
    },
    mounted() {
        this.setDefaultIndex();
    }
}
</script>
<style lang="less" scoped>
    .header-bar {
        border-bottom: 1px solid #e6e6e6;

        ul.header-menu {
            border-bottom: none;
            li.el-menu-item {
                padding-left: 0;
                padding-right: 0;
                margin-right: 6%;
            }
        }
    }
    .header-container {
        padding-left: 30px;
    }
</style>   
