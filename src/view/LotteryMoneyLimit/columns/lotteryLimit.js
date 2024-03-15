// hall1---回水厅,hall2---保本厅,hall3---高赔率厅,hall5---传统模式
export default function(Vue, group) {
  const i18n = Vue.$t('lotteryMoneyLimit')
  return [
    {
      title: i18n.lotteryMoneyLimit22,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={row.group_len}>{row.group_name}</span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.lotteryMoneyLimit23,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotteryMoneyLimit24,
      align: 'center',
      key: 'all_bet_max',
      myExt: {
        editTxt: true
      }
    },
    {
      title: i18n.lotteryMoneyLimit25,
      align: 'center',
      key: 'per_bet_max',
      myExt: {
        editTxt: true
      }
    },
    {
      title: i18n.lotteryMoneyLimit26,
      align: 'center',
      key: 'hall5',
      myExt: {
        editTxt: true
      }
    },
    {
      title: i18n.lotteryMoneyLimit32,
      align: 'center',
      key: 'max_bet',
      myExt: {
        editTxt: true
      }
    },
    // {
    //   title: i18n.lotteryMoneyLimit27,
    //   align: 'center',
    //   key: 'hall1',
    //   myExt: {
    //     editTxt: true
    //   }
    // },
    // {
    //   title: i18n.lotteryMoneyLimit28,
    //   align: 'center',
    //   key: 'hall2',
    //   myExt: {
    //     editTxt: true
    //   }
    // },
    // {
    //   title: i18n.lotteryMoneyLimit29,
    //   align: 'center',
    //   key: 'hall3',
    //   myExt: {
    //     editTxt: true
    //   }
    // }
  ]
}
