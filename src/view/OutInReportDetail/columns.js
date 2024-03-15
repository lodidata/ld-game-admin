import { Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export const thirdColumns = function(Vue) {
  const i18n = Vue.$t('outInReportDetail')
  return [
    {
      title: i18n.outInReportDetail1,
      key: 'thirdparty_name',
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.outInReportDetail2,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{MathDiv(row.money, 1)}</span>
      }
    },
    {
      title: i18n.outInReportDetail3,
      key: 'total',
      align: 'center',
      minWidth: 120
    },
    {
      title: i18n.outInReportDetail4,
      key: 'users',
      align: 'center',
      minWidth: 120
    },
    {
      title: i18n.outInReportDetail5,
      render(h, { row }) {
        return row.thirdparty_name !== i18n.outInReportDetail6 ? (
          <Button type='primary' size='small' on-click={_ => Vue.handleDetail(row.thirdparty_id)}>
            {i18n.outInReportDetail7}
          </Button>
        ) : (
          <span />
        )
      },
      align: 'center',
      minWidth: 80
    }
  ]
}

export const moneyColumns = function(Vue) {
  const i18n = Vue.$t('outInReportDetail')
  return [
    {
      title: i18n.outInReportDetail8,
      render(h, { row }) {
        return (
          <router-link to={`/memberMange?username=${row.username}`}>{row.username}</router-link>
        )
      },
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.outInReportDetail9,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.outInReportDetail10,
      key: 'deal_number',
      align: 'center',
      minWidth: 120
    },
    {
      title: i18n.outInReportDetail11,
      render(h, { row }) {
        return <span>{MathDiv(row.deal_money, 1)}</span>
      },
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.outInReportDetail12,
      key: 'memo',
      align: 'center',
      minWidth: 100
    }
  ]
}
