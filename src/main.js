import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/Toast/index.js'

import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

import {getBookAll} from "@/network/home";


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//安装Toast插件
Vue.use(toast)

//解决移动端300秒延迟
// FastClick.attach(document.body)

//图片懒加载
Vue.use(LazyLoad,{
  loading:require('./assets/img/loading/img_loading.gif')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

