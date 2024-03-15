export default Vue => {
  const i18n = Vue.$t('userReport')
  return [
    {
      title: i18n.userReport37,
      align: 'center',
      minWidth: 80,
      key: 'user_id',
      fixed: 'left',
      myExt: {
        label: 'user_id'
      }
    },
    {
      title: i18n.userReport9,
      align: 'center',
      minWidth: 80,
      key: 'user_name',
      fixed: 'left',
      myExt: {
        label: 'user_name'
      },
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.userReport10 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.userReport55_v1_2_4_9,
      align: 'center',
      minWidth: 80,
      key: 'ranting',
      myExt: {
        label: 'ranting'
      },
      render(h, { row }) {
        return <span>{row.ranting ? `LV${row.ranting}` : ``}</span>
      }
    },
    {
      title: i18n.userReport11,
      align: 'center',
      minWidth: 80,
      key: 'real_name',
      myExt: {
        label: 'real_name'
      },
      render(h, { row }) {
        return <span>{row.real_name}</span>
      }
    },
    {
      title: i18n.userReport12,
      align: 'center',
      minWidth: 80,
      key: 'agent_name',
      myExt: {
        label: 'agent_name'
      },
      render(h, { row }) {
        return <span>{row.agent_name}</span>
      }
    },
    {
      title: i18n.userReport50,
      align: 'center',
      minWidth: 80,
      key: 'channel_id',
      myExt: {
        label: 'channel_id'
      }
    },
    {
      title: i18n.userReport35,
      align: 'center',
      key: 'balance',
      minWidth: 100,
      sortable: 'custom',
      myExt: {
        label: 'balance'
      },
      render(h, { row }) {
        return <span>{row.balance}</span>
      }
    },
    {
      title: i18n.userReport38,
      align: 'center',
      key: "yk_data",
      myExt: {
        label: 'yk_data'
      },
      children: [
        {
          title: i18n.userReport39,
          align: 'center',
          minWidth: 100,
          key: 'yk_GAME',
          render(h, { row }) {
            return <span>{row.yk_data.yk_GAME}</span>
          }
        },
        {
          title: i18n.userReport40,
          align: 'center',
          minWidth: 100,
          key: 'yk_LIVE',
          render(h, { row }) {
            return <span>{row.yk_data.yk_LIVE}</span>
          }
        },
        {
          title: i18n.userReport41,
          align: 'center',
          minWidth: 100,
          key: 'yk_SPORT',
          render(h, { row }) {
            return <span>{row.yk_data.yk_SPORT}</span>
          }
        },
        {
          title: i18n.userReport42,
          align: 'center',
          minWidth: 100,
          key: 'yk_QP',
          render(h, { row }) {
            return <span>{row.yk_data.yk_QP}</span>
          }
        },
        {
          title: i18n.userReport43,
          align: 'center',
          minWidth: 100,
          key: 'yk_ESPORTS',
          render(h, { row }) {
            return <span>{row.yk_data.yk_ESPORTS}</span>
          }
        },
        {
          title: i18n.userReport44,
          align: 'center',
          minWidth: 100,
          key: 'yk_ARCADE',
          render(h, { row }) {
            return <span>{row.yk_data.yk_ARCADE}</span>
          }
        },
        {
          title: i18n.userReport45,
          align: 'center',
          minWidth: 100,
          key: 'yk_TABLE',
          render(h, { row }) {
            return <span>{row.yk_data.yk_TABLE}</span>
          }
        },
        {
          title: i18n.userReport46,
          align: 'center',
          minWidth: 100,
          key: 'yk_BY',
          render(h, { row }) {
            return <span>{row.yk_data.yk_BY}</span>
          }
        },
        {
          title: i18n.userReport47,
          align: 'center',
          minWidth: 100,
          key: 'yk_SABONG',
          render(h, { row }) {
            return <span>{row.yk_data.yk_SABONG}</span>
          }
        }
      ]
    },
    {
      title: i18n.userReport13,
      align: 'center',
      key: "cq",
      myExt: {
        label: 'cq'
      },
      children: [
        {
          title: i18n.userReport14,
          align: 'center',
          minWidth: 100,
          key: 'deposit_user_amount',
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.deposit_user_amount}</span>
          }
        },
        {
          title: i18n.userReport15,
          align: 'center',
          minWidth: 100,
          key: 'withdrawal_user_amount',
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.withdrawal_user_amount}</span>
          }
        },
        {
          title: i18n.userReport16,
          align: 'center',
          key: 'dw_drop_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.dw_drop_amount}</span>
          }
        },
        {
          title: i18n.userReport30,
          align: 'center',
          key: 'total_deposit_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.total_deposit_user_amount}</span>
          }
        },
        {
          title: i18n.userReport33,
          align: 'center',
          key: 'total_withdrawal_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.total_withdrawal_user_amount}</span>
          }
        },
        {
          title: i18n.userReport31,
          align: 'center',
          key: 'first_deposit_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.first_deposit_user_amount}</span>
          }
        },
        {
          title: i18n.userReport32,
          align: 'center',
          key: 'first_create_time',
          minWidth: 100,
          // sortable: 'custom',
          render(h, { row }) {
            return <span>{row.first_create_time}</span>
          }
        },
        {
          title: `${i18n.userReport49}`,
          align: 'center',
          key: 'recharge_time',
          minWidth: 100,
          // sortable: 'custom',
          render(h, { row }) {
            return <span>{row.recharge_time}</span>
          }
        }
      ]
    },
    {
      title: i18n.userReport17,
      align: 'center',
      key: "tz",
      myExt: {
        label: 'tz'
      },
      children: [
        {
          title: i18n.userReport18,
          align: 'center',
          key: 'bet_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.bet_user_amount}</span>
          }
        },
        {
          title: i18n.userReport19,
          align: 'center',
          key: 'prize_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.prize_user_amount}</span>
          }
        },
        {
          title: i18n.userReport20,
          align: 'center',
          key: 'bs_drop_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span class={row['bs_drop_amount'] < 0 ? 'red' : ''}>{row.bs_drop_amount}</span>
          }
        },
        {
          title: i18n.userReport29,
          align: 'center',
          key: 'total_bet_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.total_bet_user_amount}</span>
          }
        }
      ]
    },
    {
      title: i18n.userReport21,
      align: 'center',
      key: "zs",
      myExt: {
        label: 'zs'
      },
      children: [
        {
          title: i18n.userReport22,
          align: 'center',
          key: 'coupon_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.coupon_user_amount}</span>
          }
        },
        {
          title: i18n.userReport23,
          align: 'center',
          key: 'return_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.return_user_amount}</span>
          }
        },
        {
          title: i18n.userReport24,
          align: 'center',
          key: 'promotion_user_winnings',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.promotion_user_winnings}</span>
          }
        },
        {
          title: i18n.userReport25,
          align: 'center',
          key: 'turn_card_user_winnings',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.turn_card_user_winnings}</span>
          }
        },
        {
          title: i18n.userReport26,
          align: 'center',
          key: 'back_user_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.back_user_amount}</span>
          }
        },
        {
          title: i18n.userReport27,
          align: 'center',
          key: 'award_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.award_amount}</span>
          }
        },
        {
          title: i18n.userReport34,
          align: 'center',
          key: 'total_Winnings',
          minWidth: 100,
          // sortable: 'custom',
          render(h, { row }) {
            return <span>{row.total_Winnings}</span>
          }
        }
      ]
    },
    {
      title: i18n.userReport48,
      align: 'center',
      key: 'channel_id',
      minWidth: 100,
      myExt: {
        label: 'channel_id'
      },
      render(h, { row }) {
        return <span>{row.channel_id ? row.channel_id : ''}</span>
      }
    },
    {
      title: i18n.userReport28,
      align: 'center',
      key: 'register_time',
      minWidth: 100,
      myExt: {
        label: 'register_time'
      },
      render(h, { row }) {
        return <span>{row.register_time}</span>
      }
    }
  ]
}
