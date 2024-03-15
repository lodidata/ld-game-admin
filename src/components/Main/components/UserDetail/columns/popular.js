export function splitArr(list, index){
  if (!list.length) return []
  list.forEach((items, indexs) => {
    if(index == indexs){
      items.compile = true
    }
  })
  return list
}
