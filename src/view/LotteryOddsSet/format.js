// pid 排序，分组
export const pidSortAndGroup = function(list) {
  const res = {
    typeList: [],
    group: {}
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

export const playSortAndGroup = function(list) {
  const arr = []
  list.map(x => {
    x.list.map((v, i) => {
      if (i === 0) {
        v['group_start'] = true
      }
      v['group_name'] = x.name
      v['group_len'] = x.list.length
      v['play_id'] = x.play_id
      arr.push(v)
    })
  })
  return arr
}
