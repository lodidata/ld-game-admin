export default function(Vue) {
  const i18n = Vue.$t('topUpFlow')
  return [
    {
      title: `${i18n.topUpFlow7}`,//累计充值金额区间
      align: 'center',
      minWidth: 100,
      key: 'key'
    },
    {
      title: `${i18n.topUpFlow8}`,//人数
      align: 'center',
      minWidth: 100,
      key: 'user_cnt'
    },
    {
      title: `${i18n.topUpFlow9}`,//充值总额
      align: 'center',
      minWidth: 100,
      key: 'recharge_cnt'
    },
    {
      title: `${i18n.topUpFlow10}`,//提现总额
      align: 'center',
      minWidth: 100,
      key: 'withdraw_cnt'
    },
    {
      title: `${i18n.topUpFlow11}`,//提现人数
      align: 'center',
      minWidth: 100,
      key: 'withdraw_num'
    },
    {
      title: `${i18n.topUpFlow12}`,//投注总额
      align: 'center',
      minWidth: 100,
      key: 'bet_user_amount'
    },
    {
      title: `${i18n.topUpFlow13}`,//充值提款差额
      align: 'center',
      minWidth: 100,
      key: 'profit_diff'
    },
    {
      title: `${i18n.topUpFlow14}`,//杀率
      align: 'center',
      minWidth: 100,
      key: 'ratio',
      // render: (h, { row }) => {
      //   return (<span>{`${row.ratio}%`}</span>)
      // }
    },
    {
      title: `${i18n.topUpFlow15}`,//充值人数占比
      align: 'center',
      minWidth: 100,
      key: 'recharge_ratio',
      // render: (h, { row }) => {
      //   return (<span>{`${row.recharge_ratio}%`}</span>)
      // }
    },
    {
      title: `${i18n.topUpFlow16}`,//充值金额占比
      align: 'center',
      minWidth: 100,
      key: 'coin_ratio',
      // render: (h, { row }) => {
      //   return (<span>{`${row.coin_ratio}%`}</span>)
      // }
    }
  ]
}
