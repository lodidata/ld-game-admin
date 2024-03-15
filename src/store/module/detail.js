import axios from '@/libs/api.request'

export default {
  state: {
    visible: false,
    loading: false,
    curUser: {
      // 当前用户
      username: '',
      id: ''
    },
    psdState: false
  },
  mutations: {
    'detail/setVisible'(state, payload) {
      state.visible = payload
    },
    'detail/setCurUser'(state, payload) {
      state.curUser = payload
    },
    'detail/setPsdState'(state, payload){
      state.psdState = payload
    }
  },
  actions: {
    // 获取常用信息
    async 'detail/info'({ commit }, payload) {
      console.log('payload-->', payload)
      commit('detail/setCurUser', payload)
      commit('detail/setVisible', true)
    },
    // 获取推广设置
    async 'detail/agent'({ state, commit }, payload) {
      const id = state.id
      const res = await axios.request({
        url: `/user/info/agent/${id}`,
        method: 'GET'
      })
      if (res.status !== 200) {
        commit('app/addMsg', {
          type: 'error',
          message: res.message
        })
        return
      }
      console.log('res-->', res)
    }
  }
}
