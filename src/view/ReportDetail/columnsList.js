export default function(Vue) {
  const i18n = Vue.$t('reportDetail')
  return [
    {
      title: i18n.reportDetail14,
      key: 'user_name',
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.reportDetail15,
      key: 'bet_count',
      align: 'center',
      minWidth: 120
    },
    {
      title: i18n.reportDetail16,
      key: 'bet',
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (<span>{Number(row.bet)}</span>)
      }
    },
    {
      title: i18n.reportDetail17,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (<span>{Number(row.send_prize)}</span>)
      }
    },
    // {
    //   title: i18n.reportDetail18,
    //   key: 'valid_bet',
    //   align: 'center',
    //   minWidth: 100,
    //   render(h, { row }) {
    //     return (<span>{Number(row.valid_bet)}</span>)
    //   }
    // },
    {
      title: i18n.reportDetail19,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (<span>{Number(row.win_loss)}</span>)
      }
    }
  ]
}
