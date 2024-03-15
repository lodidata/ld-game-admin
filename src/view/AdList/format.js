// 格式化适用于
export function formatUseIn(v) {
  return {
    home: '首页',
    egame: '电子页',
    live: '视讯页',
    lottery: '彩票页',
    sport: '体育页',
    agent: '代理页'
  }[v]
}

// 格式化使用状态
export function formatStatus(v) {
  return {
    enabled: '启用',
    disabled: '停用'
  }[v]
}
