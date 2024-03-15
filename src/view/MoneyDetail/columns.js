
export default function(Vue) {
  const i18n = Vue.$t('moneyDetail')
  const formatCategory = v => {
    switch (v) {
      case 1:
        return i18n.moneyDetail28
      case 2:
        return i18n.moneyDetail29
      case 3:
        return i18n.moneyDetail30
      default:
        break
    }
  }
  return [
    {
      title: i18n.moneyDetail15,
      align: 'center',
      minWidth: 90,
      render: (h, { row }) => {
        return (
          <span
            class={row.tags === 4 ? 'red user_link' : 'user_link'}
            on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.username}
          </span>
        )
      }
    },
    {
      title: i18n.moneyDetail16,
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
      title: i18n.moneyDetail17,
      align: 'center',
      minWidth: 120,
      key: 'order_number'
    },
    {
      title: i18n.moneyDetail18,
      align: 'center',
      minWidth: 100,
      key: 'deal_type_name'
    },
    {
      title: i18n.moneyDetail19,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{formatCategory(row.deal_category)}</span>
      }
    },
    {
      title: i18n.moneyDetail20,
      align: 'center',
      minWidth: 100,
      key: 'deal_money',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.deal_money}</span>
      }
    },
    {
      title: i18n.moneyDetail21,
      align: 'center',
      minWidth: 100,
      key: 'withdraw_bet',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.withdraw_bet}</span>
      }
    },
    {
      title: i18n.moneyDetail22,
      align: 'center',
      minWidth: 100,
      key: 'balance',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.balance}</span>
      }
    },
    {
      title: i18n.moneyDetail23,
      align: 'center',
      minWidth: 100,
      key: 'total_bet',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_bet}</span>
      }
    },
    {
      title: i18n.moneyDetail24,
      align: 'center',
      minWidth: 100,
      key: 'total_require_bet',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_require_bet}</span>
      }
    },
    {
      title: i18n.moneyDetail25,
      align: 'center',
      minWidth: 100,
      key: 'free_money',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.free_money}</span>
      }
    },
    {
      title: i18n.moneyDetail26,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <p>{row.admin_user || '-'}</p>
      }
    },
    {
      title: i18n.moneyDetail27,
      align: 'center',
      minWidth: 100,
      key: 'memo'
    }
  ]
}
