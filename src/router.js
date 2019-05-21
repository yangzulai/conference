import Vue from 'vue'
import Router from 'vue-router'
import createApp from './components/application/createApp/createApp.vue'
import manageApp from './components/application/manageApp/manageApp.vue'
import conferenceNav from './components/application/conferenceNav/conferenceNav.vue'
import basic from './components/basic_info/basic.vue'
import agenda from './components/agenda/agenda.vue'
import headerTab from './components/headerTab.vue'
import previewComponent from './components/previewComponent/preview'
import SeatConfig from './components/seat/config'

var appName = "会议支撑系统"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/basic'
    }, {
      path: "/basic",
      name:"basic",
      meta: {
        title: "基本信息",
      },
      component: basic
    },
    {
      path: "/createApp",
      name:"createApp",
      meta: {
        title: "新建会议应用",
      },
      component: createApp
    },
    {
      path: "/manageApp",
      name:"manageApp",
      meta: {
        title: '会议应用',
      },
      component: manageApp
    },
    {
      path: "/conferenceNav",
      name:"conferenceNav",
      meta: {
        title: '会议组织',
      },
      component: conferenceNav
    },
    {
      path: "/agenda",
      name:"agenda",
      meta: {
        title: "会议议程",
      },
      component: agenda
    },
    {
      path: "/headerTab",
      name:"headerTab",
      meta: {
        title: "我的会议",
      },
      component: headerTab
    },
    {
      path: "/preview",
      name:"preview",
      meta: {
        title: "预览",
      },
      component: previewComponent
    }, {
      path: "/seat",
      name: "seat",
      meta: {
        title: "座位指引"
      },
      component: SeatConfig
    }
    
  ]
})

router.beforeEach((to,from,next) => {
  if(to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = appName
  }
  next();
})

export default router;
