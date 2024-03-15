export const lotteryLimit = function(list) {
  const res = []
  list.map(x => {
    x.lottery.map((v, i) => {
      if (i === 0) {
        v.group_start = true
      }
      v.halls.map(val => {
        // v['hall' + val.hall_level] = val.min_bet / 100
        v['hall' + val.hall_level] = val.min_bet
        val.mark = 'hall' + val.hall_level
      })
      v.group_name = x.name
      v.group_len = x.lottery.length
      // v.all_bet_max = v.all_bet_max / 100
      v.all_bet_max = v.all_bet_max
      // v.per_bet_max = v.per_bet_max / 100
      v.per_bet_max = v.per_bet_max
      // v.max_bet = v.max_bet / 100
      v.max_bet = v.max_bet
      // v.min_bet = v.min_bet / 100
      v.min_bet = v.min_bet
      res.push(v)
    })
  })
  return res
}

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
  list.map((x, i) => {
    x.list.map(v => {
      v['group_name'] = x.group
      v['group_len'] = list.length
      v['play_id'] = x.play_id
      // v.max_betting = v.max_betting / 100
      v.max_betting = v.max_betting
      arr.push(v)
    })
  })
  arr.length > 0 && (arr[0].group_start = true)
  return arr
}
