import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('payManage')
  const formatStatus = v =>
    ({
      paid: i18n.payManage156,
      pending: i18n.payManage157,
      failed: i18n.payManage158
    }[v])
  return [
    {
      title: i18n.payManage134,
      key: 'trade_no',
      align: 'center',
      minWidth: 150,
      myExt: {
        label: 'trade_no'
      }
    },
    {
      title: i18n.payManage135,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.channel_name.pay}</span>
      },
      myExt: {
        label: 'channel_name'
      }
    },
    {
      title: i18n.payManage136,
      key: 'vender_name',
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'vender_name'
      }
    },
    {
      title: i18n.payManage137,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.payManage138 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      },
      myExt: {
        label: 'username'
      }
    },
    {
      title: i18n.payManage139,
      align: 'center',
      minWidth: 80,
      key: 'origin_str',
      myExt: {
        label: 'origin_str'
      }
    },
    {
      title: i18n.payManage140,
      align: 'center',
      minWidth: 80,
      key: 'ranting',
      myExt: {
        label: 'ranting'
      }
    },
    // {
    //   title: '上级代理',
    //   minWidth: 80,
    //   key: 'agent_name',
    //   myExt: {
    //     label: 'agent_name'
    //   }
    // },
    {
      title: i18n.payManage141,
      align: 'center',
      minWidth: 80,
      key: 'money',
      render(h, { row }) {
        return <span>{row.money}</span>
      },
      myExt: {
        label: 'money'
      },
      sortable: 'custom'
    },
    {
      title: i18n.payManage142,
      align: 'center',
      minWidth: 100,
      key: 'active_name',
      render(h, { row }) {
        return <span>{row.active_name || i18n.payManage143}</span>
      },
      myExt: {
        label: 'active_name'
      }
    },
    {
      title: i18n.payManage144,
      align: 'center',
      minWidth: 120,
      render(h, { row }) {
        return <span class='red'>{row.coupon_money}</span>
      },
      myExt: {
        label: 'coupon_money'
      }
    },
    {
      title: i18n.payManage145,
      align: 'center',
      minWidth: 90,
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.payManage146,
      align: 'center',
      minWidth: 90,
      render(h, { row }) {
        return (
          <div>
            {row.over_time.split(' ').map((x, i) => (
              <p>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'over_time'
      }
    },
    {
      title: i18n.payManage170,
      align: 'center',
      minWidth: 80,
      key: 'notify_time',
      render(h, { row }) {
        return (
          <div>
            {row.notify_time ? row.notify_time.split(' ').map((x, i) => (
              <p>{x}</p>
            )) : ''}
          </div>
        )
      },
      myExt: {
        label: 'notify_time'
      }
    },
    {
      title: i18n.payManage147,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{formatStatus(row.status)}</span>
      },
      myExt: {
        label: 'status'
      }
    },
    {
      title: i18n.payManage148,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.in_money}</span>
      },
      myExt: {
        label: 'in_money'
      }
    },
    {
      title: i18n.payManage149,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' size='small' on-click={_ => Vue.handleDetail(row)}>
              {i18n.payManage150}
            </Button>
            {row.status === 'pending' ? (
              <Button
                style='margin-left:5px'
                type='primary'
                size='small'
                on-click={_ => Vue.handleSupplement(row)}
              >
                {i18n.payManage151}
              </Button>
            ) : (
              ''
            )}
          </div>
        )
      },
      myExt: {
        label: 'handle'
      }
    }
  ]
}
