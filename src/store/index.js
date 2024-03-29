import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import detail from './module/detail'
import socket from './module/socket'
import common from './module/common'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    detail,
    socket,
    common
  }
})
