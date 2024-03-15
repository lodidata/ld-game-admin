import { Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

const formatMoney = str => (str ? MathDiv(Number(str), 1) : 0)

export default function(Vue) {
  const i18n = Vue.$t('chessOrder')
  return [
    {
      title: i18n.chessOrder14,
      align: 'center',
      minWidth: 140,
      key: 'order_number'
    },
    {
      title: i18n.chessOrder15,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.chessOrder16 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.chessOrder17,
      align: 'center',
      minWidth: 100,
      key: 'GameStartTime'
    },
    {
      title: i18n.chessOrder18,
      align: 'center',
      minWidth: 100,
      key: 'GameEndTime'
    },
    {
      title: i18n.chessOrder19,
      align: 'center',
      minWidth: 100,
      key: 'game_name',
      render(h, { row }) {
        return row.game_name ? <span>{row.game_name.split('>')[0]}</span> : ''
      }
    },
    {
      title: i18n.chessOrder20,
      align: 'center',
      minWidth: 100,
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
      title: i18n.chessOrder21,
      align: 'center',
      minWidth: 80,
      key: 'pay_money',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.pay_money)}</span>
      }
    },
    {
      title: i18n.chessOrder22,
      align: 'center',
      minWidth: 80,
      key: 'CellScore',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.CellScore)}</span>
      }
    },
    {
      title: i18n.chessOrder23,
      align: 'center',
      minWidth: 80,
      key: 'Profit',
      sortable: 'custom',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Profit)}</span>
      }
    },
    {
      title: i18n.chessOrder24,
      align: 'center',
      minWidth: 80,
      key: 'Revenue',
      render: (h, { row }) => {
        return <span>{formatMoney(row.Revenue)}</span>
      }
    },
    {
      title: i18n.chessOrder25,
      minWidth: 100,
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
              {i18n.chessOrder26}
            </Button>
          )
        }
        return ''
      }
    }
  ]
}
