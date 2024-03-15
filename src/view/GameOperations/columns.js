import { Button, Tag } from 'iview'
export const dataList = function(Vue) {
  const i18n = Vue.$t('gameOperations')
  return [
    {
      title: `${i18n.gameOperations12}`,//运营商
      align: 'center',
      minWidth: 100,
      key: 'alias',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations11}`,//游戏类型
      align: 'center',
      minWidth: 100,
      key: 'rename',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations13}`,//状态
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.status === 'disabled' ? 'default' : 'success'} type='dot'>
            {row.status === 'disabled' ? `${i18n.gameOperations14}` : `${i18n.gameOperations15}`}
          </Tag>
        )
      }
    },
    // {
    //   title: `${i18n.gameOperations16}`,//有效游戏数
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'game_sub_cnt',
    //   sortable: 'custom',
    // },
    {
      title: `${i18n.gameOperations17}`,//注单数
      align: 'center',
      minWidth: 100,
      key: 'game_order_cnt',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations18}`,//投注人数
      align: 'center',
      minWidth: 100,
      key: 'game_order_user',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations19}`,//赢家人数
      align: 'center',
      minWidth: 100,
      key: 'winner_num',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations20}`,//赢家占比
      align: 'center',
      minWidth: 100,
      key: 'winner_rate',
      sortable: 'custom',
      render: (h, { row }) => {
        return (
          <span>{ row.winner_rate ? `${row.winner_rate}%` : '0%' }</span>
        )
      }
    },
    {
      title: `${i18n.gameOperations21}`,//投注总额
      align: 'center',
      minWidth: 100,
      key: 'game_bet_amount',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations22}`,//派奖总额
      align: 'center',
      minWidth: 100,
      key: 'game_prize_amount',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations23}`,//盈亏情况
      align: 'center',
      minWidth: 100,
      key: 'yk',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations24}`,//RTP(返还率)
      align: 'center',
      minWidth: 100,
      key: 'RTP',
      sortable: 'custom',
      render: (h, { row }) => {
        return (
          <span>{ row.RTP ? `${row.RTP}%` : '0%' }</span>
        )
      }
    },
    // {
    //   title: `${i18n.gameOperations25}`,//操作
    //   align: 'center',
    //   minWidth: 100,
    //   render: (h, { row }) => [
    //     h(
    //       'Button',
    //       {
    //         attrs: { style: '' },
    //         props: {
    //           type: 'primary',
    //           size: 'small'
    //         },
    //         on: {
    //           click: () => {
    //             Vue.lookDetails(row)
    //           }
    //         }
    //       },
    //       `${i18n.gameOperations26}`
    //     )
    //   ]
    // }
  ]
}

export const detailsList = function(Vue) {
  const i18n = Vue.$t('gameOperations')
  return [
    {
      title: `${i18n.gameOperations11}`,//游戏类型
      align: 'center',
      minWidth: 100,
      key: 'type',
    },
    {
      title: `${i18n.gameOperations12}`,//运营商
      align: 'center',
      minWidth: 100,
      key: 'alias',
    },
    {
      title: `${i18n.gameOperations27}`,//游戏名称
      align: 'center',
      minWidth: 100,
      key: 'rename',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations13}`,//状态
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.status === 'disabled' ? 'default' : 'success'} type='dot'>
            {row.status === 'disabled' ? `${i18n.gameOperations14}` : `${i18n.gameOperations15}`}
          </Tag>
        )
      }
    },
    {
      title: `${i18n.gameOperations17}`,//注单数
      align: 'center',
      minWidth: 100,
      key: 'game_order_cnt',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations18}`,//投注人数
      align: 'center',
      minWidth: 100,
      key: 'game_order_user',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations19}`,//赢家人数
      align: 'center',
      minWidth: 100,
      key: 'winner_num',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations20}`,//赢家占比
      align: 'center',
      minWidth: 100,
      key: 'winner_rate',
      sortable: 'custom',
      render: (h, { row }) => {
        return (
          <span>{ row.winner_rate ? `${row.winner_rate}%` : '0%' }</span>
        )
      }
    },
    {
      title: `${i18n.gameOperations21}`,//投注总额
      align: 'center',
      minWidth: 100,
      key: 'game_bet_amount',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations22}`,//派奖总额
      align: 'center',
      minWidth: 100,
      key: 'game_prize_amount',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations23}`,//盈亏情况
      align: 'center',
      minWidth: 100,
      key: 'yk',
      sortable: 'custom',
    },
    {
      title: `${i18n.gameOperations24}`,//RTP(返还率)
      align: 'center',
      minWidth: 100,
      key: 'RTP',
      sortable: 'custom',
      render: (h, { row }) => {
        return (
          <span>{ row.RTP ? `${row.RTP}%` : '0%' }</span>
        )
      }
    }
  ]
}
