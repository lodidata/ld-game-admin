import { CMD, TYPES } from '@/IM'
import config from '@/config'

const { nodeId } = config

/**
 * ===================================================
 *    统一处理工作台与 IM 的通信
 *    IM 只暴露给外部三个方法可使用
 *    handleRequestEvent   : 数据请求
 *    handleResponseEvent  : 数据接收
 *    closeSocket          : 关闭连接
 * ===================================================
 */

export default {
  name: 'mixin',
  data() {
    return {
      CMD, // 消息命令字
      TYPES // 消息内容类型
    }
  },
  methods: {
    /**
     * 统一处理数据请求逻辑 【工作台 ===》IM】
     * 将不同消息类型转换成对应的消息关键字
     * @param { String } type 消息类型
     * @param { Object } data 消息内容
     */
    handleRequestEvent(type, data) {
      let command, newData
      switch (type) {
        case 'login': // 登录请求
          if (!nodeId) return this.$Message.error('未配置客户ID')
          command = CMD.LOGIN_REQUEST
          newData = {
            nodeId,
            thirdPartyId: this.userInfo.id,
            account: this.userInfo.username,
            roleType: 959
          }
          break
        case 'pullWaitingList': // 查询可接待客户
          command = CMD.WAIT_RECEPTION_REQUEST
          newData = {}
          break
        case 'pullPendingList': // 查询当前正在接待的客户
          command = CMD.PROCESSING_RECEPTION_REQUEST
          newData = {}
          break
        case 'pullCloseList': // 查询结束会话列表
          command = CMD.CLOSE_CHAT_LIST_REQUEST
          newData = {}
          break
        case 'receiveUser': // 接待客户
          command = CMD.RECEPTION_CLIENT_REQUEST
          newData = { ...data }
          break
        case 'sendMessage': // 发送消息
          command = CMD.MESSAGE_REQUEST
          newData = { ...data }
          break
        case 'signMsg': // 签收消息
          command = CMD.MESSAGE_SIGN_REQUEST
          newData = { ...data }
          break
        case 'endReceiving': // 结束会话
          command = CMD.CLOSE_CHAT_REQUEST
          newData = { ...data }
          break
        case 'getHistoryMsg': // 获取历史消息
          command = CMD.MESSAGE_HISTORY_REQUEST
          newData = { ...data }
          break
        case 'getOnlineService': // 获取在线客服
          command = CMD.ONLINE_SERVICE_REQUEST
          newData = {}
          break
        case 'applyChangeReceive': // 请求转移客服
          command = CMD.MOVE_SERVICE_REQUEST
          newData = { ...data }
          break
        case 'replyChangeReceive': // 回应转移客服
          command = CMD.MOVE_SERVICE_AGREE_REQUEST
          newData = { ...data }
          break
        case 'setServiceName': // 设置客服昵称
          command = CMD.SERVICE_NAME_REQUEST
          newData = { ...data }
          break
        default:
          return
      }
      const msg = { command, data: newData }
      this.ImSocket.handleRequestEvent(msg)
    },

    /**
     * 统一处理消息响应逻辑 【IM ===》工作台】
     * 将接收消息关键字触发不同的回调事件
     * @param { Enumerator } command 消息关键字
     * @param { Object } data 消息内容
     */
    handleResponseEvent(command, data) {
      switch (command) {
        case CMD.LOGIN_RESPONSE: // 响应登录成功
          this.loginSuccess && this.loginSuccess(data)
          break
        case CMD.WAIT_RECEPTION_RESPONSE: // 返回可接待客户
          this.waitingListOk && this.waitingListOk(data)
          break
        case CMD.PROCESSING_RECEPTION_RESPONSE: // 返回当前正在接待的客户
          this.pendingListOk && this.pendingListOk(data)
          break
        case CMD.CLOSE_CHAT_LIST_RESPONSE: // 返回结束接待列表
          this.closeListOk && this.closeListOk(data)
          break
        case CMD.MESSAGE_RESPONSE: // 接收消息
          this.ImSocket.emit('receiveMessage', data)
          this.receiveMessage && this.receiveMessage(data)
          break
        case CMD.MESSAGE_SUCCESS: // 发送消息成功的响应
          this.ImSocket.emit('messageSuccess', data)
          break
        case CMD.MESSAGE_SIGN_RESPONSE: // 签收消息响应
          this.ImSocket.emit('signSuccess', data)
          break
        case CMD.CLOSE_CHAT_RESPONSE: // 结束会话响应
          this.ImSocket.emit('endReceivingOk', data)
          break
        case CMD.MESSAGE_HISTORY_RESPONSE: // 返回历史消息
          this.ImSocket.emit('getHistoryOk', data)
          break
        case CMD.ONLINE_SERVICE_RESPONSE: // 返回当前在线客服
          this.ImSocket.emit('getOnlineServiceOk', data)
          break
        case CMD.MOVE_SERVICE_RESPONSE: // 转移客服响应
          this.hasApplyChangeReceive && this.hasApplyChangeReceive(data)
          break
        case CMD.MOVE_SERVICE_AGREE_RESPONSE: // 是否转移客服响应
          this.replyChangeReceive && this.replyChangeReceive(data)
          break
        case CMD.SERVICE_NAME_RESPONSE: // 设置客服昵称响应
          this.setServiceNameOk && this.setServiceNameOk(data)
          break
        default:
          break
      }
    },

    /**
     * 关闭 socket
     */
    closeSocket() {
      this.ImSocket && this.ImSocket.closeSocket()
    }
  }
}
