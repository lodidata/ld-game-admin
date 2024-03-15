// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import installPlugin from '@/plugin'
import axios from '@/libs/api.request'
import i18n from './i18n/index'
import directive from './directive/index'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import '@/assets/style/layout.less'
import '@/assets/style/reset.less'
console.log(directive)
// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(directive)



// Vue.use(iView)

// 注册admin内置插件
installPlugin(Vue)
//系统错误捕获
const errorHandler = (error, vm)=>{
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
}
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);
// 生产环境关掉提示
Vue.config.productionTip = false
// 全局注册应用配置
Vue.prototype.$config = config
// 全局注册api请求
Vue.prototype.$axios = axios
// 全局注册消息提示
Vue.prototype.$msg = msg => store.commit('app/addMsg', msg)
Vue.prototype.$store = store

// 测试notification绑定
import MyNotification from '@/components/MyNotification'
Vue.use(MyNotification)

// 图片预览
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

// 图片预加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require('./assets/images/error.png'),
  loading: require('./assets/images/loading.gif')
})

// 全局时间格式化过滤器
import { formatDateTimeToString, formatDateMinuteToString, formatDateToString } from './libs/date'
Vue.filter('dateFmt', val => {
  if (new Date(val).toDateString() === new Date().toDateString()) {
    // 今日显示时分秒
    return formatDateMinuteToString(new Date(val))
  } else {
    return formatDateTimeToString(new Date(val))
  }
})

Vue.prototype.$dateFormat = val => {
  const date = typeof val === 'string' ? new Date(val) : val
  return formatDateToString(date)
}

Vue.prototype.$dateTimeFormat = val => {
  const date = typeof val === 'string' ? new Date(val) : val
  return formatDateTimeToString(date)
}

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

export default app
