import { Button } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export const mainColumns = function(Vue) {
  const i18n = Vue.$t('outInReport')
  // 可点击详情
  const showMore = [
    i18n.outInReport19,
    i18n.outInReport20,
    i18n.outInReport21,
    // i18n.outInReport22,
    i18n.outInReport47,
    i18n.outInReport23,
    i18n.outInReport24,
    i18n.outInReport25,
    i18n.outInReport26,
    i18n.outInReport27,
    i18n.outInReport28,
    i18n.outInReport29
  ]

  const outInReport19 = i18n.outInReport19
  const outInReport20 = i18n.outInReport20
  const outInReport21 = i18n.outInReport21
  const outInReport22 = i18n.outInReport22
  const outInReport47 = i18n.outInReport47
  const outInReport23 = i18n.outInReport23
  const outInReport24 = i18n.outInReport24
  const outInReport25 = i18n.outInReport25
  const outInReport26 = i18n.outInReport26
  const outInReport27 = i18n.outInReport27
  const outInReport28 = i18n.outInReport28
  const outInReport29 = i18n.outInReport29
  // 点击查看详情需要的 type 参数
  const detailTypeArg = {
    outInReport19: '102',
    outInReport21: '101',
    outInReport23: '106',
    outInReport20: '201',
    outInReport22: '105,114',
    outInReport24: '107,109,113',
    outInReport25: '204',
    outInReport26: '108',
    outInReport27: '308',
    outInReport28: '309',
    outInReport29: '501'
  }

  const formatDealType = type =>
    ({
      1: i18n.outInReport30,
      2: i18n.outInReport31,
      3: i18n.outInReport32
    }[type])
  return [
    {
      title: i18n.outInReport5,
      key: 'inKey',
      align: 'center'
    },
    {
      title: i18n.outInReport6,
      key: 'inVal',
      align: 'center',
      render(h, { row }) {
        return ~showMore.indexOf(row.inKey) ? (
          row.inKey === i18n.outInReport7 ? (
            <a href='javascript:;' on-click={_ => Vue.handleTirdDetail(row.inKey)}>
              {row.inVal}
            </a>
          ) : (
            <a href='javascript:;' on-click={_ => Vue.handleDetail(detailTypeArg[row.inKey], row.inKey)}>
              {row.inVal}
            </a>
          )
        ) : (
          <div>{row.inVal}</div>
        )
      }
    },
    {
      title: i18n.outInReport8,
      key: 'outKey',
      align: 'center'
    },
    {
      title: i18n.outInReport9,
      key: 'outVal',
      align: 'center',
      render(h, { row }) {
        return ~showMore.indexOf(row.outKey) ? (
          <a href='javascript:;' on-click={_ => Vue.handleDetail(detailTypeArg[row.outKey], row.outKey)}>
            {row.outVal}
          </a>
        ) : (
          <div>{row.outVal}</div>
        )
      }
    }
  ]
}
export const moneyColumns = function(Vue) {
  const i18n = Vue.$t('outInReport')
  const formatDealType = type =>
    ({
      1: i18n.outInReport30,
      2: i18n.outInReport31,
      3: i18n.outInReport32
    }[type])
  return [
    {
      title: i18n.outInReport10,
      align: 'center',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.outInReport11 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.username}
          </span>
        )
      }
    },
    {
      title: i18n.outInReport12,
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
      title: i18n.outInReport13,
      key: 'deal_number',
      align: 'center',
      minWidth: 120
    },
    {
      title: i18n.outInReport14,
      key: 'deal_type_name',
      render(h, { row }) {
        return row.deal_type_name ? <span>{row.deal_type_name}</span> : <span>-</span>
      },
      align: 'center',
      minWidth: 80
    },
    {
      title: i18n.outInReport15,
      render(h, { row }) {
        return row.deal_category ? <span>{formatDealType(row.deal_category)}</span> : <span>-</span>
      },
      align: 'center',
      minWidth: 80
    },
    {
      title: i18n.outInReport16,
      render(h, { row }) {
        return <span>{MathDiv(row.deal_money, 1)}</span>
      },
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.outInReport17,
      render(h, { row }) {
        return <span>{MathDiv(row.balance, 1)}</span>
      },
      align: 'center',
      minWidth: 100
    },
    {
      title: i18n.outInReport18,
      key: 'memo',
      align: 'center',
      minWidth: 100
    }
  ]
}
export const totalColumns = function(Vue) {
  const i18n = Vue.$t('outInReport')
  return [
    {
      title: i18n.outInReport48,
      align: 'center',
      minWidth: 150,
      key: 'classify',
    },
    {
      title: i18n.outInReport49,
      align: 'center',
      minWidth: 150,
      key: 'nnt',
    },
    {
      title: i18n.outInReport50,
      align: 'center',
      minWidth: 200,
      render(h, { row }) {
        return (
          <a href='javascript:;' on-click={_ => Vue.handleDetail(row.classify, row.classify)}>
            {`${row.coupon_amount}(${row.coupon_cnt}${i18n.outInReport33})`}
          </a>
        )
      }
    }
  ]
}
export const backwaterColumns = function(Vue) {
  const i18n = Vue.$t('outInReport')
  return [
    {
      title: `${i18n.outInReport68}`,//回水分类
      align: 'center',
      minWidth: 150,
      key: 'classify',
    },
    {
      title: `${i18n.outInReport69}`,//人数
      align: 'center',
      minWidth: 150,
      key: 'people',
    },
    {
      title: `${i18n.outInReport70}`,//金额
      align: 'center',
      minWidth: 200,
      render(h, { row }) {
        return (
          <a href='javascript:;' on-click={_ => Vue.handleDetail(row.classify, row.classify)}>
            {`${row.amount}(${row.num}${i18n.outInReport33})`}
          </a>
        )
      }
    }
  ]
}
export const channelList = function(Vue) {
  const i18n = Vue.$t('outInReport')
  return [
    {
      title: `${i18n.outInReport74}`,//出款渠道
      align: 'center',
      minWidth: 150,
      key: 'third_name',
    },
    {
      title: `${i18n.outInReport75}`,//累计出款金额
      align: 'center',
      minWidth: 150,
      key: 'money',
      render: (h, { row }) => {
        return (
          <span>{row.money}</span>
        )
      }
    },
    {
      title: `${i18n.outInReport76}`,//笔数
      align: 'center',
      minWidth: 150,
      key: 'cnt',
    },
    {
      title: `${i18n.outInReport77}`,//人数
      align: 'center',
      minWidth: 150,
      key: 'user_cnt',
    },
    {
      title: `${i18n.outInReport78}`,//操作
      align: 'center',
      minWidth: 150,
      render: (h, { row }) => {
        return (
          <Button type="primary" size="small" on-click={_ => Vue.handleDetail('', i18n.outInReport20, row.third_id)}>{`${i18n.outInReport79}`}</Button>
        )
      }
    },
  ]
}
