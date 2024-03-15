import axios from '@/libs/api.request'

export default {
  state: {
    levelList: [], // 会员等级列表
    caseList: [], // 转账平台
    notice: '' // 系统公告
  },
  mutations: {
    'common/levelList'(state, payload) {
      state.levelList = payload
    },
    'common/caseList'(state, payload) {
      state.caseList = payload
    },
    'common/setNotice'(state, payload) {
      state.notice = payload
    }
  },
  actions: {
    // 获取会员等级
    async 'common/level'(context, payload) {
      const res = await axios.request({
        url: '/user/level',
        method: 'GET'
      })
      if (res.status !== 200) {
        context.commit('app/addMsg', {
          type: 'error',
          message: res.message
        })
        return
      }
      context.commit('common/levelList', res.data)
      return res
    },
    // 获取转账平台
    async 'common/case'(context, payload) {
      const res = await axios.request({
        url: '/wallet/types',
        method: 'GET'
      })
      if (res.status === 200) {
        context.commit('common/caseList', res.data)
        return res
      }
    }
  }
}
