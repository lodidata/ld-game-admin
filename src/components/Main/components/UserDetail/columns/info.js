import { Button, Poptip } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export default function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: i18n.components195,
      align: 'center',
      key: 'name',
      render(h, { row }) {
        return (
          <span>
            {row.name}[{row.third_account}]
          </span>
        )
      }
    },
    {
      title: i18n.components196,
      align: 'center',
      key: 'balance',
      render(h, { row }) {
        return (
          <span class={row.create_account === 0 && 'red'}>
            {row.create_account === '0' ? i18n.components197 : MathDiv(row.balance, 1)}
          </span>
        )
      }
    },
    {
      title: i18n.components198,
      align: 'center',
      key: 'created',
      render(h, { row, index }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              disabled={row.create_account === '0'}
              on-click={_ => Vue.handleRefresh(row, index)}
            >
              {i18n.components199}
            </Button>
            <Poptip
              confirm
              placement='top-end'
              title={`${i18n.components200}【${row.name}】${i18n.components201}`}
              on-on-ok={_ => Vue.handleTransfer(row)}
            >
              <Button type='error' size='small' style='margin-right:5px'>
                {i18n.components202}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
