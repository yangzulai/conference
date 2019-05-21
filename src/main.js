import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill';
import './services/eventBus';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
Vue.prototype.$moment = moment


import vconsole from 'vconsole';
import _ from "lodash";
import mixins from './mixins'

import './assets/common.less';

if (process.env.NODE_ENV == "development") {
  new vconsole();
}

Vue.config.productionTip = false

Vue.prototype.$moment = moment
Vue.use(ElementUI);
Vue.mixin(mixins);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
