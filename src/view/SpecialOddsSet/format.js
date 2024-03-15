// 排序，分组
export const pidSortAndGroup = function(list) {
  const res = {
    sort: [],
    group: {}
  }

  res.sort = list.sort((a, b) => a.hall_level - b.hall_level)
  res.sort.map(x => {
    if (res.group[x.hall_level]) {
      res.group[x.hall_level].push(x.id)
    } else {
      res.group[x.hall_level] = [x.id]
      x.group_start = true
    }
  })
  return res
}
