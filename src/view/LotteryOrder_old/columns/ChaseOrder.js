import { Button } from 'iview'

export const chaseColumns = function(Vue) {
  const i18n = Vue.$t('lotteryOrder')
  return [
    {
      title: i18n.lotteryOrder50,
      key: 'chase_number',
      align: 'center',
      minWidth: 145,
      myExt: {
        label: 'chase_number'
      }
    },
    {
      title: i18n.lotteryOrder51,
      align: 'center',
      minWidth: 90,
      myExt: {
        label: 'user_name'
      },
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.lotteryOrder52 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.lotteryOrder53,
      align: 'center',
      minWidth: 100,
      key: 'name',
      myExt: {
        label: 'name'
      }
    },
    {
      title: i18n.lotteryOrder54,
      minWidth: 70,
      align: 'center',
      key: 'origin',
      myExt: {
        label: 'origin'
      }
    },
    {
      title: i18n.lotteryOrder55,
      align: 'center',
      minWidth: 70,
      key: 'mode_str',
      myExt: {
        label: 'mode_str'
      }
    },
    {
      title: i18n.lotteryOrder56,
      align: 'center',
      minWidth: 70,
      key: 'c/s',
      myExt: {
        label: 'c/s'
      }
    },
    {
      title: i18n.lotteryOrder57,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{row.increment_bet}</span>
      },
      myExt: {
        label: 'increment_bet'
      }
    },
    {
      title: i18n.lotteryOrder58,
      align: 'center',
      minWidth: 100,
      key: 'state',
      myExt: {
        label: 'state'
      }
    },
    {
      title: i18n.lotteryOrder59,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{row.send_money}</span>
      },
      myExt: {
        label: 'send_money'
      }
    },
    {
      title: i18n.lotteryOrder60,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{row.profit}</span>
      },
      myExt: {
        label: 'profit'
      }
    },
    {
      title: i18n.lotteryOrder61,
      align: 'center',
      minWidth: 90,
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.lotteryOrder62,
      minWidth: 120,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.status === 'underway' && Boolean(Vue.f) ? (
              <Button type='error' size='small' on-click={_ => Vue.orderCancel(row.chase_number)}>
                {i18n.lotteryOrder63}
              </Button>
            ) : (
              ''
            )}
            <Button
              style='margin-left:5px'
              type='primary'
              size='small'
              on-click={_ => Vue.handleDetail(row)}
            >
              {i18n.lotteryOrder64}
            </Button>
          </div>
        )
      },
      myExt: {
        label: 'handle'
      }
    }
  ]
}

export const detailPlayDescColumns = function(Vue) {
  const i18n = Vue.$t('lotteryOrder')
  return [
    {
      title: i18n.lotteryOrder65,
      key: 'name'
    },
    {
      title: i18n.lotteryOrder66,
      render(h, { row }) {
        return (
          <div>
            {row.play_numbers.map((x, i) => (
              <p key={i}>
                {x.title}:{x.value.join(',')}
              </p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.lotteryOrder67,
      render(h, { row }) {
        return (
          <div>
            {row.odds_array.map((x, i) => (
              <p key={i}>
                {x.name}({x.num})
              </p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.lotteryOrder68,
      key: 'times'
    },
    {
      title: i18n.lotteryOrder69,
      render(h, { row }) {
        return <span>{row.pay_money}</span>
      }
    }
  ]
}

export const detailChaseColumns = function(Vue) {
  const i18n = Vue.$t('lotteryOrder')
  return [
    {
      title: i18n.lotteryOrder70,
      key: 'lottery_number'
    },
    {
      title: i18n.lotteryOrder71,
      key: 'multiple'
    },
    {
      title: i18n.lotteryOrder72,
      render(h, { row }) {
        return <span>{row.current_bet}</span>
      }
    },
    {
      title: i18n.lotteryOrder73,
      key: 'period_code'
    },
    {
      title: i18n.lotteryOrder74,
      key: 'state'
    }
  ]
}
