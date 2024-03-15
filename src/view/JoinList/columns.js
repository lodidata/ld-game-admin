import { formatType } from './format'
import { Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('joinList')
  return [
    {
      title: i18n.joinList20,
      align: 'center',
      minWidth: 100,
      key: 'user_name',
      render(h, { row }) {
        return <span on-click={_ => Vue.handleUserDetail(row)} style="color: #2d8cf0;cursor: pointer;">{row.user_name}</span>
      }
    },
    {
      title: i18n.joinList21,
      align: 'center',
      minWidth: 100,
      key: 'active_name'
    },
    {
      title: i18n.joinList22,
      align: 'center',
      minWidth: 100,
      key: 'template'
      // render(h, { row }) {
      //   return <span>{formatType(row.type_id)}</span>
      // }
    },
    {
      title: i18n.joinList23,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.deposit_money}</span>
      }
    },
    {
      title: i18n.joinList24,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.coupon_money}</span>
      }
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
      title: i18n.joinList26,
      align: 'center',
      minWidth: 130,
      key: 'process_time'
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
      title: i18n.joinList30,
      minWidth: 180,
      align: 'center',
      key: 'memo',
      myExt: {
        editTxt: true
      }
    }
  ]
}
