import { Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export default function(Vue) {
  const i18n = Vue.$t('memberLevel')
  return [
    {
      title: i18n.memberLevel24,
      align: 'center',
      key: 'name',
      minWidth: 90
    },
    {
      title: i18n.memberLevel25,
      align: 'center',
      render(h, { row }) {
        return <img src={row.icon} class='pic' />
      },
      minWidth: 120
    },
    {
      title: i18n.memberLevel26,
      align: 'center',
      children: [
        {
          title: i18n.memberLevel27,
          align: 'center',
          minWidth: 80,
          render(h, { row }) {
            // return <span>{MathDiv(row.lottery_money, 100)}</span>
            return <span>{row.lottery_money}</span>
          }
        },
        {
          title: i18n.memberLevel28,
          align: 'center',
          minWidth: 80,
          render(h, { row }) {
            // return <span>{MathDiv(row.deposit_money, 100)}</span>
            return <span>{row.deposit_money}</span>
          }
        }
      ]
    },
    {
      title: i18n.memberLevel29,
      align: 'center',
      children: [
        {
          title: i18n.memberLevel30,
          align: 'center',
          minWidth: 80,
          render(h, { row }) {
            // return <span>{MathDiv(row.promote_handsel, 100)}</span>
            return <span>{row.promote_handsel}</span>
          }
        },
        {
          title: i18n.memberLevel31,
          align: 'center',
          minWidth: 80,
          render(h, { row }) {
            return <span>{MathDiv(row.transfer_handsel, 100)}%</span>
          }
        },
        {
          title: i18n.memberLevel32,
          align: 'center',
          minWidth: 120,
          render(h, { row }) {
            return <span>{row.draw_count}</span>
          }
        }
      ]
    },
    {
      title: i18n.memberLevel33,
      key: 'user_count',
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.memberLevel34,
      key: 'num',
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <Button type='primary' on-click={_ => Vue.handleDetail(row)}>
            {i18n.memberLevel35}
          </Button>
        )
      }
    },
    {
      title: i18n.memberLevel36,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' on-click={_ => Vue.handleEdit(row)}>
              {i18n.memberLevel37}
            </Button>
          </div>
        )
      }
    }
  ]
}
