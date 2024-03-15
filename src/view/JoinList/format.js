// 活动类型
export function formatType(v) {
  return {
    '1': '实名认证',
    '2': '新人首充',
    '3': '每日首充',
    '4': '新增活动',
    '5': '注册送'
  }[v]
}
