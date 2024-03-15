export default function(Vue) {
  const i18n = Vue.$t('thirdDetail')
  return [
    {
      title: i18n.thirdDetail5,
      align: 'center',
      key: 'trade_no',
      minWidth: 70
    },
    {
      title: i18n.thirdDetail6,
      align: 'center',
      render(h, { row }) {
        return <span>{row.money}</span>
      }
    },
    {
      title: i18n.thirdDetail7,
      align: 'center',
      render(h, { row }) {
        return (
          <div>{row.created ? row.created.split(' ').map((x, i) => <p key={i}>{x}</p>) : '-'}</div>
        )
      }
    },
    {
      title: i18n.thirdDetail8,
      align: 'center',
      key: 'user_name'
    },
    {
      title: i18n.thirdDetail9,
      align: 'center',
      key: 'level_name'
    },
    {
      title: i18n.thirdDetail10,
      align: 'center',
      key: 'memo'
    }
  ]
}
