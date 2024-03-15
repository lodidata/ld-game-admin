export default function(Vue, title) {
  const i18n = Vue.$t('reportDetail')
  return [
    {
      title: title,
      align: 'center',
      children: [
        {
          title: i18n.reportDetail4,
          key: 'game_name',
          align: 'center',
          minWidth: 100
        },
        {
          title: i18n.reportDetail5,
          key: 'game_order_user',
          align: 'center',
          minWidth: 120,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail6,
          key: 'game_order_cnt',
          align: 'center',
          minWidth: 100,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail7,
          key: 'game_bet_amount',
          align: 'center',
          minWidth: 100,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail8,
          key: 'game_prize_amount',
          align: 'center',
          minWidth: 100,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail9,
          key: 'game_code_amount',
          align: 'center',
          minWidth: 100,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail10,
          key: 'game_order_profit',
          align: 'center',
          minWidth: 100,
          sortable: 'custom'
        },
        {
          title: i18n.reportDetail11,
          align: 'center',
          minWidth: 100,
          render(h, { row }) {
            const isTotal = row.game_name && row.game_name.indexOf(i18n.reportDetail12) === -1
            return (
              isTotal && <a style={{ color: '#2196f3' }} on-click={_ => Vue.handleDetail(row)}>{i18n.reportDetail13}</a>
            )
          }
        }
      ]
    }
  ]
}
