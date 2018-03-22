// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/less/index.less'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Scroll from 'better-scroll'
import VueLazyLoad from "vue-lazyload"

Vue.use(VueAwesomeSwiper)

//处理移动端click三秒延迟的问题
fastclick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad,{
  loading:require("assets/images/default.png")
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
