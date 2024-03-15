export default function(Vue) {
  const i18n = Vue.$t('lotteryReport')
  return [
    {
      title: i18n.lotteryReport21,
      align: 'center',
      key: 'lottery_number'
    },
    {
      title: i18n.lotteryReport22,
      align: 'center',
      key: 'official_time'
    },
    {
      title: i18n.lotteryReport23,
      align: 'center',
      key: 'bet_amount'
    },
    {
      title: i18n.lotteryReport24,
      align: 'center',
      render: (h, { row }) => {
        return (
          <span style='color:#2d8cf0;cursor: pointer;' on-click={_ => Vue.handleDetail(row)}>
            {i18n.lotteryReport25}
          </span>
        )
      }
    }
  ]
}
