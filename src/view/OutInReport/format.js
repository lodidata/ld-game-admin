import i18n from '@/i18n/index'
let i18n_lang = i18n.messages[i18n.locale].outInReport;
export const handleMainData = function(data) {
  const res = []
  res.push(
    _setVal(
      i18n_lang.outInReport19,
      `${data['offline_amount']}(${data['offline_cnt']}${i18n_lang.outInReport33})`,
      i18n_lang.outInReport20,
      `${data['withdrawal_amount']}(${data['withdrawal_cnt']}${i18n_lang.outInReport33})`
    )
  )
  res.push(
    _setVal(
      i18n_lang.outInReport21,
      `${data['online_amount']}(${data['online_cnt']}${i18n_lang.outInReport33})`,
      // i18n_lang.outInReport22,
      // `${data['coupon_amount']}(${data['coupon_cnt']}${i18n_lang.outInReport33})`
      i18n_lang.outInReport47,
      `${data['total_Winnings']}(${data['total_Winnings_cnt']}${i18n_lang.outInReport33})`
    )
  )
  res.push(
    _setVal(
      i18n_lang.outInReport23,
      `${data['manual_deposit_amount']}(${data['manual_deposit_cnt']}${i18n_lang.outInReport33})`,
      i18n_lang.outInReport24,
      `${data['return_amount']}(${data['return_cnt']}${i18n_lang.outInReport33})`
    )
  )
  // res.push(
  //   _setVal(
  //     '-',
  //     '-',
  //     '-',
  //     '-',
  //     // i18n_lang.outInReport27,
  //     // `${data['promotion_winnings']}(${data['promotion_winnings_cnt']}${i18n_lang.outInReport33})`,
  //     '',
  //     ''
  //   )
  // )
  // res.push(
  //   _setVal(
  //     '-',
  //     '-',
  //     '-',
  //     '-',
  //     // i18n_lang.outInReport28,
  //     // `${data['turn_card_winnings']}(${data['turn_card_winnings_cnt']}${i18n_lang.outInReport33})`,
  //     '',
  //     ''
  //   )
  // )
  res.push(
    _setVal(
      '-',
      '-',
      i18n_lang.outInReport25,
      `${data['manual_deduction_amount']}(${data['manual_deduction_cnt']}${i18n_lang.outInReport33})`,
      '',
      ''
    )
  )
  res.push(_setVal('-', '-', i18n_lang.outInReport26, `${data['back_amount']}(${data['back_cnt']}${i18n_lang.outInReport33})`, '', ''))
  res.push(_setVal('-', '-', i18n_lang.outInReport29, `${data['game_code_amount']}(${data['game_code_cnt']}${i18n_lang.outInReport33})`, '', ''))
  res.push(_setVal('-', '-', i18n_lang.outInReport51, `${data['shares_settle_amount']}(${data['shares_settle_cnt']}${i18n_lang.outInReport33})`, '', ''))
  res.push(_setVal('-', '-', i18n_lang.outInReport53, `${data['profit_loss_amount']}(${data['profit_loss_cnt']}${i18n_lang.outInReport33})`, '', ''))
  res.push(_setVal(i18n_lang.outInReport34, data['income_amount'], i18n_lang.outInReport35, data['out_amount'], '', ''))

  return res
}
function _setVal(inKey, inVal, outKey, outVal, otherKey, otherVal) {
  return { inKey, inVal, outKey, outVal, otherKey, otherVal }
}
