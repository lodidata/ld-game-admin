/**
 * 消息命令字
 */
export const CMD = {
  HEARTBEAT_REQUEST: 1, // 心跳请求
  HEARTBEAT_RESPONSE: 2, // 心跳响应
  LOGIN_REQUEST: 3, // 登录请求
  LOGIN_RESPONSE: 4, // 登录响应
  MESSAGE_REQUEST: 5, // 发送消息
  MESSAGE_RESPONSE: 6, // 响应消息
  WAIT_RECEPTION_REQUEST: 7, // 查询可接待客户
  WAIT_RECEPTION_RESPONSE: 8, // 返回可接待客户
  RECEPTION_CLIENT_REQUEST: 9, // 接待客户
  PROCESSING_RECEPTION_REQUEST: 10, // 查询当前正在接待的客户
  PROCESSING_RECEPTION_RESPONSE: 11, // 返回当前正在接待的客户
  MESSAGE_SUCCESS: 12, // 消息发送成功回值
  MESSAGE_SIGN_REQUEST: 13, // 请求签收消息
  MESSAGE_SIGN_RESPONSE: 14, // 签收消息响应
  CLOSE_CHAT_REQUEST: 15, // 结束会话
  CLOSE_CHAT_RESPONSE: 16, // 结束会话响应
  CLOSE_CHAT_LIST_REQUEST: 17, // 查询结束会话列表
  CLOSE_CHAT_LIST_RESPONSE: 18, // 返回结束接待列表
  ONLINE_SERVICE_REQUEST: 19, // 查询在线客服
  ONLINE_SERVICE_RESPONSE: 20, // 查询客服响应
  MOVE_SERVICE_REQUEST: 21, // 转移客服
  MOVE_SERVICE_RESPONSE: 22, // 转移客服响应
  MOVE_SERVICE_AGREE_REQUEST: 23, // 是否同意转移客服
  MOVE_SERVICE_AGREE_RESPONSE: 24, // 是否同意转移客服响应
  MESSAGE_HISTORY_REQUEST: 25, // 拉取历史消息
  MESSAGE_HISTORY_RESPONSE: 26, // 历史消息响应
  SERVICE_NAME_REQUEST: 29, // 命名客服昵称
  SERVICE_NAME_RESPONSE: 30 // 命名客服响应
}

/**
 * 消息类型
 */
export const TYPES = {
  HINT: 1, // 系统提示
  TEXT: 2, // 文本消息
  PICTURE: 3, // 图片消息
  VOICE: 4, // 语音消息
  VEDIO: 5 // 视频消息
}
