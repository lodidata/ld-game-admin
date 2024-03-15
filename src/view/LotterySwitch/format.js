import i18n from '@/i18n/index'
let i18n_lang = i18n.messages[i18n.locale].lotterySwitch;
// 获取重复的group 做表格行合并 按照group字段排序
// group:{ "猜和值":[1,2,3] }
export const handleGroupSort = function(list) {
  const res = {
    sort: [],
    group: {}
  }
  res.sort = list.sort((a, b) => a.group.localeCompare(b.group))
  res.sort.map(x => {
    if (res.group[x.group]) {
      res.group[x.group].push(x.id)
    } else {
      res.group[x.group] = [x.id]
      x.group_start = true
    }
    // 处理一下购球数的数据
    if (x.buy_ball_num === 0 || !Number(x.buy_ball_num)) {
      x.buy_ball_num = i18n_lang.lotterySwitch28
    }
  })
  return res
}
