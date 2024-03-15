import { Tag } from 'iview'

export default function(Vue) {
   const i18n = Vue.$t('joinList')
  return [
    {
      title: i18n.joinList20,
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: i18n.joinList25,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.withdraw_require}</span>
      }
    },
    {
      title: i18n.joinList31,
      align: 'center',
      minWidth: 100,
      key: 'apply_time'
    },
    {
      title: i18n.joinList27,
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.state === 'manual' ? 'blue' : 'success'} type='dot'>
            {row.state === 'manual' ? i18n.joinList28 : i18n.joinList29}
          </Tag>
        )
      }
    },
    {
      title: i18n.joinList32,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <span>
          {row.award_type !=3 ? `${i18n.joinList33}${row.coupon_money}${i18n.joinList34}` : `${row.matter_name}`}
          </span>
        )
      }
    }
  ]
}
