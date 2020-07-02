import Vue from 'vue'
import App from './App.vue'
import router from '@/router.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

import './assets/js/mock'

import axios from 'axios'

// import { getRequest, postRequest} from './libs/api';//导入
// Vue.prototype.getRequest = getRequest;//注入到vue对象
// Vue.prototype.postRequest = postRequest;//注入到vue对象

Vue.prototype.$axios = axios

Vue.use(ElementUI)

// 设置当前环境为部署(开发+上线)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
