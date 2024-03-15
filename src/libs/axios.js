import axios from 'axios'
import store from '@/store'
import { getToken, isRepeat } from './util'
// import { Spin } from 'iview'
const addMsg = (errorInfo = { request: {}, data: {} }) => {
  const {
    statusText,
    status,
    request: { responseURL },
    data: { message }
  } = errorInfo
  const info = {
    type: 'error',
    code: status,
    mes: statusText,
    url: responseURL,
    message
  }
  store.commit('app/addMsg', info)
}

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig(isLogin) {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'lang': localStorage.getItem('language') || 'en-us',
        Authorization: isLogin ? `Bearer false` : `Bearer ${getToken()}`
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      error => {
        this.destroy(url)
        addMsg(error.response)
        const response = error.data
        response.status = error.response.state ? error.response.state : error.response.status

        return response
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        const response = res.data
        response.status = res.state ? res.state : res.status
        if(response.state === 11050 || response.state === 11051){
          store.commit(`detail/setPsdState`, response.state)
          response.data = null
          return response
        }else{
          store.commit(`detail/setPsdState`, false)
          return response
        }
      },
      error => {
        const response = error.response.data
        response.status = error.response.state ? error.response.state : error.response.status
        if (response.status >= 401) {
          if (response.state === 10041 && !isRepeat('overtime')) {
            // 登录超时
            store.dispatch('user/overTime')
          }
        }
        return response
      }
    )
  }
  request(options) {
    // 筛除值为空的参数  options.params && typeof options.params === 'object' options.method.toUpperCase() == "GET" &&
    if (options.params && typeof options.params === 'object') {
      Object.keys(options.params).forEach(k => {
        if (options.params[k] === '' || options.params[k] === null) {
          delete options.params[k]
        }
      })
    }

    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options.url == `/admin/login` ? 1 : 0), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
