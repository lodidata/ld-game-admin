import i18n from '../i18n/index'
import {
  computeDay,
  getCurrentWeek,
  getLastWeek,
  getCurrentMonth,
  getLastMonth
} from '@/libs/handleDate'

let i18n_lang = i18n.messages[i18n.locale].lotteryDate

export default {
  shortcuts: [
    {
      text: i18n_lang.lotteryDate0,
      value: () => [computeDay(-1), computeDay(-1)]
    },
    {
      text: i18n_lang.lotteryDate1,
      value: () => [computeDay(), computeDay()]
    },
    {
      text: i18n_lang.lotteryDate2,
      value: () => getCurrentWeek()
    },
    {
      text: i18n_lang.lotteryDate3,
      value: () => getLastWeek()
    },
    {
      text: i18n_lang.lotteryDate4,
      value: () => getCurrentMonth()
    },
    {
      text: i18n_lang.lotteryDate5,
      value: () => getLastMonth()
    }
  ],
  disabledDate(date) {
    // 限制只能选择往前数50天
    return date && date.valueOf() < Date.now() - 4320000000
  }
}
