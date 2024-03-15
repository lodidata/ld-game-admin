import axios from '@/libs/api.request'
import router from '@/router'
import { setToken, getToken, localSave, localRead } from '@/libs/util'

const userInfo = localRead('userInfo')
const access = localRead('access') != 'undefined' && localRead('access') != 'null' && localRead('access') ? localRead('access') : ''
const tabAccess = localRead('tabAccess') != 'undefined' && localRead('tabAccess') != 'null' && localRead('tabAccess') ? localRead('tabAccess') : ''
const allRoutes = localRead('allRoutes') != 'undefined' && localRead('allRoutes') != 'null' && localRead('allRoutes') ? localRead('allRoutes') : ''

export default {
  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : {}, // 用户信息
    access: access ? JSON.parse(access) : [], // 权限信息
    tabAccess: tabAccess ? JSON.parse(tabAccess) : [], //页面tab展示权限
    allRoutes: allRoutes ? JSON.parse(allRoutes) : [], //展示权限
    token: getToken()
  },
  mutations: {
    'user/setUserInfo'(state, userInfo) {
      state.userInfo = userInfo
      localSave('userInfo', JSON.stringify(userInfo))
    },
    'user/setToken'(state, token) {
      state.token = token
      setToken(token)
    },
    'user/setAuth'(state, auth) {
      state.access = auth
      localSave('access', JSON.stringify(auth))
    },
    'user/setTabAccess'(state, tabAccess) {
      state.tabAccess = tabAccess
      localSave('tabAccess', JSON.stringify(tabAccess))
    },
    'user/setAllRoutes'(state, allRoutes) {
      state.allRoutes = allRoutes
      localSave('allRoutes', JSON.stringify(allRoutes))
    }
  },
  actions: {
    // 登录
    async 'user/handleLogin'({ commit }, { req }) {
      const res = await axios.request({
        method: 'POST',
        url: '/admin/login',
        data: req
      })
      return res
    },
    // 登录
    async 'user/getUserInfo'({ commit }) {
      const res = await axios.request({
        method: 'GET',
        url: `admin/sisLogin`
      })
      if(res.data){
        commit('user/setUserInfo',res.data.list)
        commit('user/setAuth', res.data.route2)
      }
      return res
    },
    // 退出登录
    async 'user/handleLogOut'({ commit }) {
      sessionStorage.removeItem('parameter')
      commit('user/setToken', '')
      commit('user/setUserInfo', {})
      router.push({ path: '/login' })
    },
    // 登录超时
    async 'user/overTime'({ dispatch }) {
      dispatch('user/handleLogOut')
    }
  }
}
