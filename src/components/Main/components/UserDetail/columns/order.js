import { Poptip, Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

const formatMoney = str => (str ? MathDiv(Number(str), 1) : '')

export default function(Vue) {
  const i18n = Vue.$t('components')
  const format = {
    origin: v =>
      ({
        1: 'PC',
        2: 'H5',
        3: 'APP'
      }[v]),
    mode: v => {
      if (~v.indexOf('std')) {
        return i18n.components221
      }
      if (~v.indexOf('fast')) {
        return i18n.components222
      }
      if (~v.indexOf('chat')) {
        return i18n.components223
      }
      // if (~v.indexOf('video')) {
      //   return '直播模式'
      // }
    }
  }
  const DEFAULTTABLE = [
    {
      title: i18n.components224,
      align: 'center',
      minWidth: 140,
      key: 'order_number'
    },
    {
      title: i18n.components225,
      align: 'center',
      minWidth: 100,
      key: 'GameStartTime'
    },
    {
      title: i18n.components226,
      align: 'center',
      minWidth: 100,
      key: 'GameEndTime'
    },
    {
      title: i18n.components227,
      align: 'center',
      minWidth: 80,
      key: 'game_name',
      render(h, { row }) {
        return row.game_name ? <span>{row.game_name.split('>')[0]}</span> : ''
      }
    },
    {
      title: i18n.components228,
      align: 'center',
      minWidth: 50,
      key: 'TableID',
      render(h, { row }) {
        return row.TableID ? (
          <span>{row.TableID.includes('>') ? row.TableID.split('>')[1] : row.TableID}</span>
        ) : (
          ''
        )
      }
    },
    {
      title: i18n.components229,
      align: 'center',
      minWidth: 50,
      key: 'pay_money',
      render: (h, { row }) => {
        return <span>{formatMoney(row.pay_money)}</span>
      }
    },
    {
      title: i18n.components230,
      align: 'center',
      minWidth: 50,
      key: 'CellScore',
      render: (h, { row }) => {
        return <span>{formatMoney(row.CellScore)}</span>
      }
    },
    {
      title: i18n.components231,
      align: 'center',
      minWidth: 50,
      key: 'Profit',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Profit)}</span>
      }
    },
    {
      title: i18n.components232,
      align: 'center',
      minWidth: 50,
      key: 'Revenue',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Revenue)}</span>
      }
    },
    {
      title: i18n.components233,
      minWidth: 50,
      align: 'center',
      render(h, { row }) {
        if (row.order_number) {
          return (
            <Button
              type='primary'
              size='small'
              on-click={_ => Vue.getOrderInfo(row)}
              style='margin-right:5px'
            >
              {i18n.components234}
            </Button>
          )
        }
        return ''
      }
    }
  ]
  return {
    DEFAULTTABLE,
    LOTTERY: [
      {
        title: i18n.components235,
        key: 'order_number',
        align: 'center',
        minWidth: 140
      },
      {
        title: i18n.components236,
        key: 'created',
        align: 'center',
        minWidth: 140
      },
      {
        title: i18n.components237,
        align: 'center',
        minWidth: 35,
        render: (h, { row }) => {
          return <span>{format.origin(row.origin)}</span>
        }
      },
      {
        title: i18n.components238,
        align: 'center',
        key: 'lottery_name',
        minWidth: 80
      },
      {
        title: i18n.components239,
        key: 'lottery_number',
        align: 'center',
        minWidth: 100
      },
      {
        title: i18n.components240,
        align: 'center',
        minWidth: 90,
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
        title: i18n.components241,
        align: 'center',
        minWidth: 120,
        render: (h, { row }) => {
          return <span>{`${row.play_group}-${row.play_name}`}</span>
        }
      },
      {
        title: i18n.components242,
        minWidth: 200,
        align: 'center',
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
        title: i18n.components243,
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
        title: i18n.components244,
        align: 'center',
        minWidth: 80,
        render(h, { row }) {
          return (
            <div>
              <p>{`${row.bet_num}${i18n.components245}`}</p>
              <p>{`${row.times}${i18n.components246}`}</p>
            </div>
          )
        }
      },
      {
        title: i18n.components247,
        align: 'center',
        minWidth: 70,
        render(h, { row }) {
          return <span>{MathDiv(row.one_money, 1)}</span>
        }
      },
      {
        title: i18n.components248,
        align: 'center',
        minWidth: 70,
        render(h, { row }) {
          return <span>{MathDiv(row.pay_money, 1)}</span>
        }
      },
      {
        title: i18n.components249,
        minWidth: 100,
        key: 'period_code'
      },
      {
        title: i18n.components250,
        align: 'center',
        minWidth: 70,
        render(h, { row }) {
          return <span>{MathDiv(row.p_money, 1)}</span>
        }
      },
      {
        title: i18n.components251,
        align: 'center',
        minWidth: 70,
        render(h, { row }) {
          return <span>{MathDiv(row.lose_earn, 1)}</span>
        }
      },
      {
        title: i18n.components252,
        minWidth: 60,
        align: 'center',
        key: 'state2'
      },
      {
        title: i18n.components253,
        minWidth: 100,
        align: 'center',
        render(h, { row }) {
          return row.state2 === i18n.components254 ? (
            <Poptip
              confirm
              placement='top-end'
              title={`${i18n.components255}${row.order_number}${i18n.components256}`}
              on-on-ok={_ => Vue.orderCancel(row)}
            >
              <Button type='error' size='small'>
                {i18n.components257}
              </Button>
            </Poptip>
          ) : (
            <span>-</span>
          )
        }
      }
    ]
  }
}
