// 账号状态
export function formatState(v) {
  return {
    '0': '停用',
    '1': '启用',
    '4': '封号'
  }[v]
}
// 活动类型
export function formatType(v) {
  return {
    '1': '实名认证',
    '2': '新人首充',
    '3': '每日首充',
    '4': '新增活动',
    '5': '注册送',
    '6': '幸运轮盘'
  }[v]
}

// 处理数据将字符串转为数组
export function splitArr(list) {
  // let res = [];
  if (!list.length) return []
  list.map(v => {
    const arr = []
    v.bind_info_list = v.bind_info ? v.bind_info.split(',') : []
    // v.send_max = Number(v.send_max) / 100
    v.send_max = Number(v.send_max)
    // 字符串方便表单校验
    v.vender_type = v.vender_type + ''
    v.send_type = v.send_type + ''
    v.sort = v.sort + ''
    v.withdraw_require_val = v.withdraw_require_val + ''
    v.send_max = v.send_max + ''
    if (v.template_id === 2 || v.template_id === 3 || v.template_id === 11) {
      if (v.rule) {
        v.rule.split(';').map(x => {
          const temp = []
          x.split(',').map((y, i) => {
            if(i != 3){
              // temp.push(Number(y) / 100)
              temp.push(Number(y))
            }else{
              temp.push(Number(y))
            }
          })
          arr.push(temp)
        })
        if (v.send_type === '2') {
          v.ruleList = arr
          v.moneyList = [['', '', '']]
        } else {
          v.ruleList = [['', '', '']]
          v.moneyList = arr
        }
      } else {
        v.ruleList = [['', '', '']]
        v.moneyList = [['', '', '']]
      }
    }
    if (v.template_id === 5 || v.template_id === 1) {
      // v.rule = Number(v.rule) / 100 + ''
      v.rule = Number(v.rule) + ''
    }
  })
  return list
}

// 数组转为字符串，state=true表示元素要乘以100
export const arrToString = function(list) {
  let str = ''
  list.map(x => {
    const temp = []
    if(x[3]){
      temp.push([x[0] * 100, x[1] * 100, (x[2] * 100).toString().split('.')[1] ? (x[2] * 100).toString().split('.')[0] : x[2] * 100, x[3] ? x[3] : ''])
    }else{
      temp.push([x[0] * 100, x[1] * 100, (x[2] * 100).toString().split('.')[1] ? (x[2] * 100).toString().split('.')[0] : x[2] * 100])
    }
    str += temp.join(',') + ';'
  })
  return str.substring(0, str.length - 1)
}
