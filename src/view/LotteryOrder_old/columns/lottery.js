import { Poptip, Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export default function(Vue) {
  const i18n = Vue.$t('lotteryOrder')
  const format = {
    origin: v =>
      ({
        1: 'PC',
        2: 'H5',
        3: 'APP'
      }[v]),
    mode: v => {
      if (~v.indexOf('std')) {
        return i18n.lotteryOrder100
      }
      if (~v.indexOf('fast')) {
        return i18n.lotteryOrder101
      }
      if (~v.indexOf('chat')) {
        return i18n.lotteryOrder102
      }
      // if (~v.indexOf('video')) {
      //   return '直播模式'
      // }
    }
  }
  return [
    {
      title: i18n.lotteryOrder75,
      key: 'order_number',
      align: 'center',
      minWidth: 140,
      myExt: {
        label: 'order_number'
      }
    },
    {
      title: i18n.lotteryOrder76,
      align: 'center',
      minWidth: 80,
      myExt: {
        label: 'user_name'
      },
      render: (h, { row }) => {
        return (
          <span
            class={row.tags === 4 || row.tags === 7 ? 'red' : 'user_link'}
            on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.lotteryOrder77,
      key: 'created',
      align: 'center',
      minWidth: 140,
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.lotteryOrder78,
      align: 'center',
      minWidth: 35,
      myExt: {
        label: 'origin'
      },
      render: (h, { row }) => {
        return <span>{format.origin(row.origin)}</span>
      }
    },
    {
      title: i18n.lotteryOrder79,
      align: 'center',
      key: 'lottery_name',
      minWidth: 80,
      myExt: {
        label: 'lottery_name'
      }
    },
    {
      title: i18n.lotteryOrder80,
      key: 'lottery_number',
      align: 'center',
      minWidth: 100,

      myExt: {
        label: 'lottery_number'
      }
    },
    {
      title: i18n.lotteryOrder81,
      align: 'center',
      minWidth: 90,
      myExt: {
        label: 'mode'
      },
      render: (h, { row }) => {
        return (
          row.mode_str && (
            <span>
              {row.mode_str.split(' ').map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </span>
          )
        )
      }
    },
    {
      title: i18n.lotteryOrder82,
      align: 'center',
      minWidth: 120,
      myExt: {
        label: 'play_name'
      },
      render: (h, { row }) => {
        return <span>{`${row.play_group}-${row.play_name}`}</span>
      }
    },
    {
      title: i18n.lotteryOrder83,
      minWidth: 200,
      align: 'center',
      myExt: {
        label: 'play_number'
      },
      render(h, { row }) {
        return (
          <div>
            {row.play_numbers.map((x, i) => (
              <p>{`${x.title}:${x.value.join(',')}`}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.lotteryOrder84,
      myExt: {
        label: 'odds'
      },
      align: 'center',
      minWidth: 120,
      render(h, { row }) {
        return row.odds ? (
          <div>
            {Object.keys(row.odds).map((x, i) => (
              <p key={i}>{`${x}(${row.odds[x]})`}</p>
            ))}
          </div>
        ) : (
          '-'
        )
      }
    },
    {
      title: i18n.lotteryOrder85,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <div>
            <p>{`${row.bet_num}${i18n.lotteryOrder86}`}</p>
            <p>{`${row.times}${i18n.lotteryOrder87}`}</p>
          </div>
        )
      },
      myExt: {
        label: 'count'
      }
    },
    {
      title: i18n.lotteryOrder88,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{MathDiv(row.one_money, 1)}</span>
      },
      myExt: {
        label: 'one_money'
      }
    },
    {
      title: i18n.lotteryOrder89,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{MathDiv(row.pay_money, 1)}</span>
      },
      myExt: {
        label: 'pay_money'
      }
    },
    {
      title: i18n.lotteryOrder90,
      minWidth: 100,
      key: 'period_code',
      myExt: {
        label: 'period_code'
      }
    },
    {
      title: i18n.lotteryOrder91,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{MathDiv(row.p_money, 1)}</span>
      },
      myExt: {
        label: 'p_money'
      }
    },
    {
      title: i18n.lotteryOrder92,
      align: 'center',
      minWidth: 70,
      render(h, { row }) {
        return <span>{MathDiv(row.lose_earn, 1)}</span>
      },
      myExt: {
        label: 'lose_earn'
      }
    },
    {
      title: i18n.lotteryOrder93,
      minWidth: 60,
      align: 'center',
      key: 'state2',
      myExt: {
        label: 'state2'
      }
    },
    {
      title: i18n.lotteryOrder94,
      minWidth: 100,
      align: 'center',
      myExt: {
        label: 'handle',
        // require: true
      },
      render(h, { row }) {
        return row.state2 === i18n.lotteryOrder95 && Boolean(Vue.f) ? (
          <Poptip
            confirm
            title={`${i18n.lotteryOrder96}${row.order_number}${i18n.lotteryOrder97}`}
            on-on-ok={_ => Vue.orderCancel(row)}
          >
            <Button type='error' size='small'>
              {i18n.lotteryOrder98}
            </Button>
          </Poptip>
        ) : (
          <span>-</span>
        )
      }
    }
  ]
}
