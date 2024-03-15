import i18n from '@/i18n/index'
import { computeDay } from '../../libs/handleDate'
let i18n_lang = i18n.messages[i18n.locale].serviceCount;
export function formatDate(v) {
  return {
    '0': i18n_lang.serviceCount8,
    '1': i18n_lang.serviceCount9,
    '7': i18n_lang.serviceCount10,
    '30': i18n_lang.serviceCount11
  }[v]
}
// 处理传参时间
export function formatOPtDate(v) {
  const time = {
    start_time: '',
    end_time: ''
  }
  switch (v) {
    case 0:
      time.start_time = computeDay(-1)
      time.end_time = computeDay(-1)
      break
    case 1:
      time.start_time = computeDay()
      time.end_time = computeDay()
      break
    case 7:
      time.start_time = computeDay(-6)
      time.end_time = computeDay()
      break
    case 30:
      time.start_time = computeDay(-29)
      time.end_time = computeDay()
      break
  }
  return time
}
