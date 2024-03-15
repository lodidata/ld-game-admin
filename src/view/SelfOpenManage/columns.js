import { Button, Tooltip, Icon } from 'iview'

const formatTimeNum = num => {
  const date = new Date(num * 1000)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const mi = date.getMinutes()
  const s = date.getSeconds()

  function supZero(x) {
    return x < 10 ? '0' + x : x
  }
  return `${y}-${supZero(m)}-${supZero(d)} ${supZero(h)}:${supZero(mi)}:${supZero(s)}`
}

export default function(Vue) {
  const i18n = Vue.$t('selfOpenManage')
  const formatState = v =>
    ({
      1: i18n.selfOpenManage64,
      2: i18n.selfOpenManage65,
      0: i18n.selfOpenManage66
    }[v])

  const formatPeriodType = v =>
    ({
      manual_lottery: i18n.selfOpenManage67,
      interval_lottery: i18n.selfOpenManage68,
      jackpot_lottery: i18n.selfOpenManage69,
      rand_lottery: i18n.selfOpenManage70
    }[v])
  return [
    {
      title: i18n.selfOpenManage42,
      align: 'center',
      key: 'lottery_number'
    },
    {
      title: i18n.selfOpenManage43,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {formatTimeNum(row.start_time)
              .split(' ')
              .map((x, i) => (
                <p key={i}>{x}</p>
              ))}
          </div>
        )
      }
    },
    {
      title: i18n.selfOpenManage44,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {formatTimeNum(row.end_time)
              .split(' ')
              .map((x, i) => (
                <p key={i}>{x}</p>
              ))}
          </div>
        )
      }
    },
    {
      title: i18n.selfOpenManage45,
      align: 'center',
      render(h, { row }) {
        return <span> {formatState(row.state)}</span>
      }
    },
    {
      title: i18n.selfOpenManage46,
      align: 'center',
      render(h, { row }) {
        return <span> {row.period_code}</span>
      }
    },
    {
      title: i18n.selfOpenManage47,
      align: 'center',
      render(h, { row }) {
        return row.pay_money === '' ? '' : <span> {row.pay_money}</span>
      }
    },
    {
      title: i18n.selfOpenManage48,
      align: 'center',
      key: 'period_count'
    },
    {
      title: i18n.selfOpenManage49,
      align: 'center',
      render(h, { row }) {
        return row.send_money === '' ? '' : <span> {Number(row.send_money)}</span>
      }
    },
    {
      title: i18n.selfOpenManage50,
      align: 'center',
      key: 'prize_counts'
    },
    {
      title: i18n.selfOpenManage51,
      align: 'center',
      render(h, { row }) {
        return row.min_prize_once_money === '' ? (
          ''
        ) : (
          <span> {Number(row.min_prize_once_money)}</span>
        )
      }
    },
    {
      title: i18n.selfOpenManage52,
      align: 'center',
      render(h, { row }) {
        return row.max_prize_once_money === '' ? (
          ''
        ) : (
          <span> {Number(row.max_prize_once_money)}</span>
        )
      }
    },
    {
      title: i18n.selfOpenManage53,
      align: 'center',
      renderHeader(h, params) {
        return (
          <Tooltip placement='top' transfer content={`${i18n.selfOpenManage54}`}>
            {params.column.title}
            <Icon type='ios-help-outline' />
          </Tooltip>
        )
      },
      render(h, { row }) {
        return row.prize_profit === '' ? '' : <span> {row.prize_profit}%</span>
      }
    },
    {
      title: i18n.selfOpenManage55,
      align: 'center',
      renderHeader(h, params) {
        return (
          <Tooltip placement='top' transfer content={`${i18n.selfOpenManage56}`}>
            {params.column.title}
            <Icon type='ios-help-outline' />
          </Tooltip>
        )
      },
      render(h, { row }) {
        return row.jackpot === '' ? '' : <span>{row.jackpot}</span>
      }
    },
    {
      title: i18n.selfOpenManage57,
      align: 'center',
      renderHeader(h, params) {
        return (
          <Tooltip placement='top' transfer content={`${i18n.selfOpenManage58}`}>
            {params.column.title}
            <Icon type='ios-help-outline' />
          </Tooltip>
        )
      },
      render(h, { row }) {
        return row.profit === '' ? '' : <span> {row.profit}%</span>
      }
    },
    {
      title: i18n.selfOpenManage60,
      align: 'center',
      render(h, { row }) {
        return row.desc === '' ? (
          <span> {formatPeriodType(row.period_type)}</span>
        ) : (
          <span>
            {formatPeriodType(row.period_type)}
            <p>({row.desc})</p>
          </span>
        )
      }
    },
    {
      title: i18n.selfOpenManage61,
      align: 'center',
      render(h, { row }) {
        return row.state === 0 || row.state === 1 ? (
          row.is_manual_lottery === 1 ? (
            <Button type='primary' size='small' on-click={_ => Vue.handleCancel(row)}>
              {i18n.selfOpenManage62}
            </Button>
          ) : (
            <Button type='primary' size='small' on-click={_ => Vue.handleOpenResult(row)}>
              {i18n.selfOpenManage63}
            </Button>
          )
        ) : (
          '-'
        )
      }
    }
  ]
}
