import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('lotteryHallSet')
  return [
    {
      title: i18n.lotteryHallSet20,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={row.group_len}>{row.lottery_name}</span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.lotteryHallSet21,
      align: 'center',
      key: 'hall_level',
      render(h, { row }) {
        const item = Vue.levelList.filter(x => x.level === row.hall_level)
        return <span>{item.length > 0 && item[0].name}</span>
      }
    },
    {
      title: i18n.lotteryHallSet22,
      align: 'center',
      key: 'hall_name'
    },
    {
      title: i18n.lotteryHallSet23,
      align: 'center',
      key: 'rebet_desc'
    },
    {
      title: i18n.lotteryHallSet24,
      align: 'center',
      key: 'min_balance'
    },
    {
      title: i18n.lotteryHallSet25,
      align: 'center',
      key: 'rebot_list',
      ellipsis: true
    },
    {
      title: i18n.lotteryHallSet26,
      align: 'center',
      key: 'state',
      render(h, { row }) {
        return (
          <span>
            {row.rebot_min}-{row.rebot_max}
          </span>
        )
      }
    },
    {
      title: i18n.lotteryHallSet27,
      width: 120,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.lotteryHallSet28}
            </Button>
          </div>
        )
      }
    }
  ]
}
