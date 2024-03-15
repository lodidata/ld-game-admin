export default function(Vue) {
  const i18n = Vue.$t('components')
  const formatCategory = v => {
    switch (v) {
      case 1:
        return i18n.components206
      case 2:
        return i18n.components207
      case 3:
        return i18n.components208
      default:
        break
    }
  }
  return [
    {
      title: i18n.components209,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.components210,
      align: 'center',
      minWidth: 120,
      key: 'order_number'
    },
    {
      title: i18n.components211,
      align: 'center',
      minWidth: 80,
      key: 'deal_type_name'
    },
    {
      title: i18n.components212,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{formatCategory(row.deal_category)}</span>
      }
    },
    {
      title: i18n.components213,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.deal_money}</span>
      }
    },
    {
      title: i18n.components214,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.withdraw_bet}</span>
      }
    },
    {
      title: i18n.components215,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.balance}</span>
      }
    },
    {
      title: i18n.components216,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.total_bet}</span>
      }
    },
    {
      title: i18n.components217,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.total_require_bet}</span>
      }
    },
    {
      title: i18n.components218,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{row.free_money}</span>
      }
    },
    {
      title: i18n.components219,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <p>{row.admin_user || '-'}</p>
      }
    },
    {
      title: i18n.components220,
      align: 'center',
      minWidth: 150,
      key: 'memo'
    }
  ]
}
