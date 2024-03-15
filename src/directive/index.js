import auth from './auth'
import btn from './btn'
// 自定义指令
const directives = {
 auth,
 btn
}
 let d = {
    install(Vue) {
      Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key])
      })
    },
  }
export default d