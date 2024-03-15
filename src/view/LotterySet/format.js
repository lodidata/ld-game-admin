import i18n from '@/i18n/index'
let i18n_lang = i18n.messages[i18n.locale].lotterySet;
// pid 排序，分组
export const pidSortAndGroup = function(list) {
  const res = {
    sort: [],
    group: {}
  }
  res.sort = list.sort((a, b) => a.pid - b.pid)
  res.sort.map(x => {
    if (res.group[x.pid]) {
      res.group[x.pid].push(x.id)
    } else {
      res.group[x.pid] = [x.id]
      x.group_start = true
    }
  })
  return res
}

// 根据时段划分
export const homeSortData = function(list) {
  const res = {}
  list.map((x, i) => {
    if (res[x.timeType]) {
      res[x.timeType].push(x)
    } else {
      res[x.timeType] = []
      res[x.timeType].push(x)
    }
  })
  return res
}

export const lotterySortAndGroup = function(list) {
  const res = {
    typeList: [],
    group: { 0: [{ id: '0', name: i18n_lang.lotterySet27 }] }
  }
  const pidArr = []
  list.map(x => {
    if (x.pid === 0) {
      pidArr.push(x.id)
      res.typeList.push({ id: x.id, name: x.name })
      res.group[x.id] = []
    } else {
      if (pidArr.indexOf(x.pid) < 0) {
        pidArr.push(x.pid)
        res.group[x.pid] = []
        res.typeList.push({ id: x.pid, name: x.name })
      }
    }
  })
  const sort = list.filter(x => x.pid !== 0).sort((a, b) => a.pid - b.pid)
  sort.map(v => {
    res.group[v.pid].push(v)
  })
  return res
}

// 去掉当前已有的彩种
export const filterData = function(list, currentArr) {
  let res = []
  const arr = []
  currentArr.map(x => arr.push(x.id))
  res = list.filter(x => arr.indexOf(x.id) < 0)
  return res
}

// 重新排序
export const sortData = function(list) {
  const res = []
  list.map((x, i) => {
    const t = {
      id: x.id,
      state: x.state,
      sort: i + 1
    }
    res.push(t)
  })
  return res
}
