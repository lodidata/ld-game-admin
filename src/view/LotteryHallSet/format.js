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

export const playSortAndGroup = function(list, name, id) {
  if (!list.length) return []
  list.map((x, i) => {
    if (i === 0) {
      x['group_start'] = true
    }
    x['group_len'] = list.length
    x['lottery_name'] = name
    x['lottery_id'] = id
  })
  return list
}

export const backWaterSet = function(list) {
  list.map(x => {
    x.halls.map(v => {
      v.rebet_condition = formatBackOption(v.rebet_condition)
      v.rebet_config = formatWinLose(v.rebet_config)
    })
  })
  return list
}

function formatBackOption(rebet_condition) {
  const arr = []
  if (rebet_condition) {
    rebet_condition.split(';').map(x => {
      const temp = {
        value: x.split(',')[0],
        state: x.split(',')[1] === 1
      }
      arr.push(temp)
    })
  }
  return arr
}

function formatWinLose(rebet_config) {
  const res = []
  if (rebet_config) {
    const temp = rebet_config.split(';')
    temp.map((x, i) => {
      res.push(x.split(','))
    })
  }
  return res
}

export const conditionToString = function(list) {
  let str = ''
  list.map(x => {
    console.log(x)
    const val = x.state ? 1 : 0
    str += x.value + ',' + val + ';'
  })
  return str.substring(0, str.length - 1)
}
export const configToString = function(list) {
  console.log(list)
  let str = ''
  list.map(x => {
    console.log(x)
    str += x.join(',') + ';'
  })
  return str.substring(0, str.length - 1)
}
