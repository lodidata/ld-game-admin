import axios from '@/libs/api.request'
import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
  isRepeat
} from '@/libs/util'
import beforeClose from '@/router/before-close'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers, homeName),
    local: localRead('local'),
    msgList: [],
    hasReadErrorPage: false,
    language: localRead('language'),// language: localRead('language') || 'en-us'
    languageList: sessionStorage.getItem('languageList') ? JSON.parse(sessionStorage.getItem('languageList')) : []
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    errorList: state => state.msgList.filter(o => o.type === 'error')
  },
  mutations: {
    'app/setBreadCrumb'(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    'app/setTagNavList'(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      const homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        const homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    'app/closeTag'(state, route) {
      const tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      if (route.meta && route.meta.beforeCloseName && route.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[route.meta.beforeCloseName]).then(close => {
          if (close) {
            closePage(state, route)
          }
        })
      } else {
        closePage(state, route)
      }
    },
    'app/addTag'(state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route)
      const index = state.tagNavList.findIndex(o => o.name === route.name)
      if (index >= 0) {
        // 直接替换路由信息
        state.tagNavList.splice(index, 1, router)
      } else {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
      }
      setTagNavListInLocalstorage([...state.tagNavList])
    },
    'app/setLocal'(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    'app/addMsg'(state, msg) {
      // 做节流，限制触发间隔
      if (msg.type === 'error' && !isRepeat('msgError', 1000)) {
        state.msgList.push(msg)
      } else if (msg.type === 'success' && !isRepeat('msgSuccess', 1000)) {
        state.msgList.push(msg)
      }
    },
    'app/removeMsg'(state) {
      state.msgList.shift()
    },
    'app/languageSet'(state, language) {
      if(typeof(language) == 'string'){
        if(language == 'zh-cn'){
          localSave('lang', 'ZH_CN')
        }else if(language == 'th'){
          localSave('lang', 'TH')
        }else{
          localSave('lang', 'EN')
        }
        location.reload()
        localSave('language', language)
        state.language = language
      }else{
        sessionStorage.setItem('languageList', JSON.stringify(language))
        state.languageList = language
      }
    }
  },
  actions: {
    // 获取语言
    async 'app/languageList'({ commit }) {
      const res = await axios.request({
        method: 'GET',
        url: '/admin/weblang',
      })
      if(res.data){
        if(!localRead('language')){
          res.data.default ? commit('app/languageSet', res.data.default) : commit('app/languageSet', 'en-us')
          if(res.data.default == 'zh-cn'){
            localSave('lang', 'ZH_CN')
          }else if(res.data.default == 'th'){
            localSave('lang', 'TH')
          }else{
            localSave('lang', 'EN')
          }
        }
        let list = ['zh-cn', 'th', 'en-us', 'es-mx']
        res.data.list ? commit('app/languageSet', res.data.list) : commit('app/languageSet', list)
      }
    },
  }
}
