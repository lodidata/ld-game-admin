// 彩种分类
export function lotteryToTree(list) {
  const handle = JSON.parse(JSON.stringify(list))
  return handle
    .sort((a, b) => a.pid - b.pid)
    .reduce((a, b) => {
      if (b.pid === 0) {
        a[b.id] = b
        a[b.id].children = []
      } else if (a[b.pid]) {
        a[b.pid].children.push(b)
      }
      return a
    }, {})
}
