import { MathDiv } from '@/libs/formatMath'
export default function(Vue) {
  const i18n = Vue.$t('manual')
  return [
    {
      title: i18n.manual85,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.manual86 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.username}
          </span>
        )
      }
    },
    {
      title: i18n.manual87,
      align: 'center',
      minWidth: 100,
      key: 'wallet_type_name'
    },
    {
      title: i18n.manual88,
      align: 'center',
      minWidth: 100,
      key: 'adjust_type'
    },
    {
      title: i18n.manual89,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(row.balance, 1)}</span>
      }
    },
    {
      title: i18n.manual90,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(row.balance_before, 1)}</span>
      }
    },
    {
      title: i18n.manual91,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(row.balance_after, 1)}</span>
      }
    },
    {
      title: i18n.manual92,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(row.withdraw_bet, 1)}</span>
      }
    },
    {
      title: i18n.manual93,
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    },
    {
      title: i18n.manual94,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            {row.operation_time
              ? row.operation_time.split(' ').map((x, i) => <p key={i}>{x}</p>)
              : '-'}
          </div>
        )
      }
    },
    {
      title: i18n.manual95,
      align: 'center',
      minWidth: 100,
      key: 'memo'
    }
  ]
}
