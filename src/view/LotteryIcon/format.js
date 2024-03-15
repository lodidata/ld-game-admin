// pid 排序，分组
export const pidSortAndGroup = function (list) {
  const res = {
    sort: [],
    group: {}
  }
  const pidArr = list.filter(x => x.pid === 0).reduce((a, b) => {
    a[b.id] = b.name
    return a
  }, {})

  res.sort = list.filter(x => x.pid !== 0).sort((a, b) => a.pid - b.pid)

  res.sort.map(x => {
    if (res.group[x.pid]) {
      res.group[x.pid].push(x.id)
    } else {
      res.group[x.pid] = [x.id]
      x.group_start = true
    }
    x.p_name = pidArr[x.pid]
  })
  console.log('图片', res)
  return res
}
