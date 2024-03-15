export default {
  state: {
    ImSocket: null,
    ImInfo: {}
  },
  mutations: {
    'socket/setImSocket'(state, ImSocket) {
      state.ImSocket = ImSocket
    },
    'socket/setImInfo'(state, ImInfo) {
      state.ImInfo = ImInfo
    }
  }
}
