// 后端返回的数据格式很乱 格式化一下
export const formatBackData = function(data) {
  const res = {
    base: {},
    money: {},
    lottery: {}
  }

  res.base = {
    password_login_fault: data.password_login_fault, // 登录密码容错次数
    register_type: data.register_type, // 注册方式
    first_WeChat_binding: data.first_WeChat_binding, // 微信首次快登绑定手机
    free_try_play: data.free_try_play // 免费试玩
    // 世界杯广告位
  }
}
