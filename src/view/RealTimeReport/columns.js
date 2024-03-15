export const dataList = function(Vue) {
  const i18n = Vue.$t('realTimeReport')
  return [
    {
      title: `${i18n.realTimeReport13}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: `${i18n.realTimeReport14}`,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'user_level'
    },
    {
      title: `${i18n.realTimeReport15}`,//在线状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      // render: (h, { row }) => {
      //   return (
      //     <span>
      //       { row.status == 1 ? `${i18n.realTimeReport16}` : `${i18n.realTimeReport17}` }
      //     </span>
      //   )
      // }
    },
    {
      title: `${i18n.realTimeReport18}`,//账户余额
      align: 'center',
      minWidth: 80,
      key: 'balance',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.balance || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport19}`,//今日充值
      align: 'center',
      minWidth: 80,
      key: 'deposit_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.deposit_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport20} `,//今日兑换
      align: 'center',
      minWidth: 80,
      key: 'withdrawal_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.withdrawal_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport21} `,//今日流水
      align: 'center',
      minWidth: 80,
      key: 'bet_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.bet_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport22} `,//今日打码量
      align: 'center',
      minWidth: 80,
      key: 'dml',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.dml || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport23}`,//总充值
      align: 'center',
      minWidth: 80,
      key: 'total_deposit_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_deposit_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport24}`,//历史总兑换
      align: 'center',
      minWidth: 80,
      key: 'total_withdrawal_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_withdrawal_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport25}`,//历史总流水
      align: 'center',
      minWidth: 80,
      key: 'total_bet_user_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_bet_user_amount || 0}</span>
      }
    },
    {
      title: `${i18n.realTimeReport26}`,//历史总打码量
      align: 'center',
      minWidth: 80,
      key: 'total_dml',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.total_dml || 0}</span>
      }
    },
    {
      title: `IP`,//IP
      align: 'center',
      minWidth: 80,
      key: 'login_ip',
      // sortable: 'custom',
      render(h, { row }) {
        return <span>{row.login_ip}</span>
      }
    },
    {
      title: `${i18n.realTimeReport27}`,//时间
      align: 'center',
      minWidth: 80,
      key: 'update_time',
      // sortable: 'custom',
      render(h, { row }) {
        return <span>{row.update_time}</span>
      }
    }
  ]
  }
