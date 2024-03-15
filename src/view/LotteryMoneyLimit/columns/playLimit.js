export default function(Vue, group) {
  const i18n = Vue.$t('lotteryMoneyLimit')
  return [
    {
      title: i18n.lotteryMoneyLimit30,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={row.group_len}>{row.group_name || row.name}</span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.lotteryMoneyLimit31,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotteryMoneyLimit21,
      align: 'center',
      key: 'max_betting',
      myExt: {
        editTxt: true
      }
    },
    // {
    //   title: '单注最大',
    //   align: 'center',
    //   key: 'max_betting',
    //   myExt: {
    //     editTxt: true
    //   }
    // },
    // {
    //   title: '单注最小',
    //   align: 'center',
    //   key: 'max_betting',
    //   myExt: {
    //     editTxt: true
    //   }
    // }
  ]
}
