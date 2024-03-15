export function MathAdd(a, b) {
  if (!a && !b) return '0'
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (MathMul(a, e) + MathMul(b, e)) / e
}

// 浮点数相减
export function MathSub(a, b) {
  if (!a && !b) return '0'
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (MathMul(a, e) - MathMul(b, e)) / e
}

// 浮点数相乘
export function MathMul(a, b) {
  if (!a || !b) return '0'
  var c = 0

  var d = a.toString()

  var e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

// 浮点数相除
export function MathDiv(a, b) {
  if (!a || !b) return '0'
  var c

  var d

  var e = 0

  var f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  let numberString = MathMul(c / d, Math.pow(10, f - e)).toString()
  let number
  if(numberString.split(".")[1]){
    number = numberString.split(".")[1].length <= 2 ? MathMul(c / d, Math.pow(10, f - e)) : `${numberString.split(".")[0]}.${numberString.split(".")[1].substring(0, 2)}`
  }else{
    number = MathMul(c / d, Math.pow(10, f - e))
  }
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    number
    // MathMul(c / d, Math.pow(10, f - e))
  )
}
