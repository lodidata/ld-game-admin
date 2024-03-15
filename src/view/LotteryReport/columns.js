export default function(Vue) {
  const i18n = Vue.$t('lotteryReport')
  return [
    {
      title: i18n.lotteryReport12,
      align: 'center',
      render(h, { row }) {
        return <span>{row._index + 1}</span>
      }
    },
    {
      title: i18n.lotteryReport13,
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.lotteryReport14,
      align: 'center',
      key: 'betNumber',
      sortable: 'custom'
    },
    {
      title: i18n.lotteryReport15,
      align: 'center',
      key: 'betAmount',
      sortable: 'custom'
    },
    {
      title: i18n.lotteryReport16,
      align: 'center',
      key: 'winAmount',
      sortable: 'custom'
    },
    {
      title: i18n.lotteryReport17,
      align: 'center',
      key: 'yk',
      sortable: 'custom'
    }
  ]
}
