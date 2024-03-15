// 日期转 string  2018-10-10
export function formatDateToString(date) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
}
// 日期转string  2018-10-10 00:00:00
export function formatDateTimeToString(date) {
  if (typeof date === 'string') return date
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d} ${hour}:${minute}:${second}`
}

// 日期转string   00:00:00
export function formatDateMinuteToString(date) {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return `${hour}:${minute}:${second}`
}
