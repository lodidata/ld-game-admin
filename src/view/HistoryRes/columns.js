import { Button } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('historyRes')
  return [
    {
      title: i18n.historyRes3,
      align: 'center',
      key: 'lottery_name'
    },
    {
      title: i18n.historyRes4,
      align: 'center',
      key: 'lottery_number'
    },
    {
      title: i18n.historyRes5,
      align: 'center',
      key: 'start_time'
    },
    {
      title: i18n.historyRes6,
      align: 'center',
      key: 'end_time'
    },
    {
      title: i18n.historyRes7,
      align: 'center',
      key: 'catch_time'
    },
    {
      title: i18n.historyRes8,
      align: 'center',
      minWidth: 80,
      key: 'period_code'
    },
    {
      title: i18n.historyRes9,
      align: 'center',
      key: 'state',
      render(h, { row }) {
        return <span>{row.state === 'open' ? i18n.historyRes10 : i18n.historyRes11}</span>
      }
    },
    {
      title: i18n.historyRes12,
      align: 'center',
      render(h, { row }) {
        return(
        <div>
          <Button
            type={row.state === 'open' ? 'success' : 'error'}
            size='small'
            on-click={_ => Vue.handleInquire(row)}
          >{i18n.historyRes13}</Button>
        </div>
        )
      }
    }
  ]
}
