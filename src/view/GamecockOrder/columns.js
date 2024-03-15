import { Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

const formatMoney = str => (str ? MathDiv(Number(str), 1) : 0)

const isRed = val => {
  return typeof val === 'string' && val.startsWith('#') && val.endsWith('#')
}

export default function(Vue) {
  const i18n = Vue.$t('sportOrder')
  return [
    {
      title: i18n.sportOrder14,
      align: 'center',
      minWidth: 140,
      key: 'order_number'
    },
    {
      title: i18n.sportOrder15,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.sportOrder16 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.sportOrder17,
      align: 'center',
      minWidth: 100,
      key: 'GameStartTime'
    },
    {
      title: i18n.sportOrder18,
      align: 'center',
      minWidth: 100,
      key: 'GameEndTime'
    },
    {
      title: i18n.sportOrder19,
      align: 'center',
      minWidth: 150,
      render(h, { row }) {
        if (Array.isArray(row.outcome)) {
          return (
            <div class='desc-cell'>
              {row.outcome.map(o => {
                const isRedKey = isRed(o.key)
                const isRedValue = isRed(o.value)
                return (
                  <div class='desc-line'>
                    <h3 class={isRedKey && 'red'}>{o.key}</h3>
                    <p class={isRedValue && 'red'}>{o.value}</p>
                  </div>
                )
              })}
            </div>
          )
        } else {
          return h('div', {
            domProps: {
              innerHTML: row.outcome
            }
          })
        }
      }
    },
    {
      title: i18n.sportOrder20,
      align: 'center',
      minWidth: 280,
      render(h, { row }) {
        if (Array.isArray(row.desc)) {
          return (
            <div class='desc-cell'>
              {row.desc.map(o => {
                const isRedKey = isRed(o.key)
                const isRedValue = isRed(o.value)
                return (
                  <div class='desc-line'>
                    <h3 class={isRedKey && 'red'}>{o.key}</h3>
                    <p class={isRedValue && 'red'}>{o.value}</p>
                  </div>
                )
              })}
            </div>
          )
        } else {
          return h('div', {
            domProps: {
              innerHTML: row.desc
            }
          })
        }
      }
    },

    {
      title: i18n.sportOrder21,
      align: 'center',
      minWidth: 70,
      key: 'pay_money',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.pay_money)}</span>
      }
    },
    {
      title: i18n.sportOrder22,
      align: 'center',
      minWidth: 70,
      key: 'CellScore',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.CellScore)}</span>
      }
    },
    {
      title: i18n.sportOrder23,
      align: 'center',
      minWidth: 70,
      key: 'Profit',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Profit)}</span>
      }
    },
    {
      title: i18n.sportOrder24,
      align: 'center',
      minWidth: 70,
      key: 'Revenue',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Revenue)}</span>
      }
    },
    {
      title: i18n.sportOrder25,
      minWidth: 80,
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
              {i18n.sportOrder26}
            </Button>
          )
        }
        return ''
      }
    }
  ]
}
