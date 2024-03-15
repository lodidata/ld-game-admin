export const dataList = function(Vue) {
  const i18n = Vue.$t('GivePrizes')
  return [
    {
      title: `${i18n.GivePrizes4}`,
      align: 'center',
      minWidth: 100,
      key: 'msg_title'
    },
    {
      title: `${i18n.GivePrizes5}`,
      align: 'center',
      minWidth: 100,
      key: 'msg_content'
    },
    {
      title: `${i18n.GivePrizes6}`,
      align: 'center',
      minWidth: 100,
      key: 'notice_away_text'
    },
    {
      title: `${i18n.GivePrizes7}`,
      align: 'center',
      minWidth: 100,
      key: 'give_num'
    },
    {
      title: `${i18n.GivePrizes28}`,//已领取人数
      align: 'center',
      minWidth: 100,
      key: 'receive_num'
    },
    {
      title: `${i18n.GivePrizes8}`,
      align: 'center',
      minWidth: 100,
      key: 'give_amount',
      render(h, { row }) {
        return <span>{row.give_amount}</span>
      }
    },
    {
      title: `${i18n.GivePrizes9}`,
      align: 'center',
      minWidth: 100,
      key: 'dm_num',
      render(h, { row }) {
        return <span>{row.dm_num}</span>
      }
    },
    {
      title: `${i18n.GivePrizes10}`,
      align: 'center',
      minWidth: 100,
      key: 'total_give_amount',
      render(h, { row }) {
        return <span>{row.total_give_amount}</span>
      }
    },
    {
      title: `${i18n.GivePrizes31_4_9}`,//已领取金额
      align: 'center',
      minWidth: 100,
      key: 'receive_total_amount',
      render(h, { row }) {
        return <span>{row.receive_total_amount}</span>
      }
    },
    {
      title: `${i18n.GivePrizes11}`,
      align: 'center',
      minWidth: 100,
      key: 'create_time'
    },
    {
      title: `${i18n.GivePrizes12}`,
      align: 'center',
      minWidth: 100,
      key: 'give_time'
    },
    {
      title: `${i18n.GivePrizes16}`,
      align: 'center',
      minWidth: 100,
      key: 'valid_time'
    },
    {
      title: `${i18n.GivePrizes17}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleTransfer(row)
              }
            }
          },
          `${i18n.GivePrizes18}`
        )
      ]
    }
  ]
}

export const detailsList = function(Vue) {
  const i18n = Vue.$t('GivePrizes')
  return [
    {
      title: `${i18n.GivePrizes19}`,
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: `${i18n.GivePrizes29}`,
      align: 'center',
      minWidth: 100,
      key: 'receive_amount',
      render(h, { row }) {
        return <span>{row.receive_amount ? row.receive_amount : ''}</span>
      }
    },
    {
      title: `${i18n.GivePrizes20}`,
      align: 'center',
      minWidth: 100,
      key: 'receive_time'
    }
  ]
}
