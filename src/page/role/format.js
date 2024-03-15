export const formatToTreeData = function(list) {
  const res = JSON.parse(JSON.stringify(list))
  res
    .map(x => {
      x.pid = x.pid || 0
      x.children = x.children || x.child
      x.children
        .map((y, j) => {
          y.pid = y.pid || 0
          y.checked = !!y.can
          delete y.component
          delete y.path
          return y
        })
        .sort((a, b) => a.id - b.id)
      delete x.component
      delete x.path
      delete x.icon
      delete x.child
      return x
    })
    .sort((a, b) => a.id - b.id)
  return res
}
