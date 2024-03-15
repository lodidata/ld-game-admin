export const collectData = function(Vue) {
  const i18n_lang = Vue.$t('profitStatement')
  return [
    {
      title: `${i18n_lang.profitStatement20}`,
      align: 'center',
      key: 'game_type_name',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement21}`,
      align: 'center',
      key: 'game_bet_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement22}`,
      align: 'center',
      key: 'game_prize_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement23}`,
      align: 'center',
      key: 'game_profit',
      minWidth: 100
    },
  ]
}

export const agentDetails = function(Vue) {
  const i18n_lang = Vue.$t('profitStatement')
  return [
    {
      title: `${i18n_lang.profitStatement24}`,
      align: 'center',
      key: 'deal_log_no',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement25}`,
      align: 'center',
      key: 'user_name',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span
            class="user_link"
            on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: `${i18n_lang.profitStatement26}`,
      align: 'center',
      key: 'agent_name',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement57}`,
      align: 'center',
      key: 'agent_cnt',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span
            class="user_link"
            on-click={_ => Vue.lookAgentCnt(row)}
          >
            {row.agent_cnt}
          </span>
        )
      }
    },
    {
      title: `${i18n_lang.profitStatement28}`,
      align: 'center',
      key: 'bet_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement29}`,
      align: 'center',
      key: 'loseearn_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement30}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_BY}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_GAME}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_LIVE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_QP}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_ESPORTS}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_ARCADE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_TABLE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_SPORT}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_SABONG}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement59_lottery}`,
          align: 'center',
          key: 'TCP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_TCP}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'BINGO',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_BINGO}</span>
          }
        },
        // {
        //   title: `${i18n_lang.profitStatement40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.yk_CP}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.profitStatement41}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_BY ? `${row.zb_BY}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_GAME ? `${row.zb_GAME}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_LIVE ? `${row.zb_LIVE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_QP ? `${row.zb_QP}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_ESPORTS ? `${row.zb_ESPORTS}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_ARCADE ? `${row.zb_ARCADE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_TABLE ? `${row.zb_TABLE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_SPORT ? `${row.zb_SPORT}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_SABONG ? `${row.zb_SABONG}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement59_lottery}`,
          align: 'center',
          key: 'TCP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_TCP ? `${row.zb_TCP}%` : ``}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'BINGO',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_BINGO ? `${row.zb_BINGO}%` : ``}</span>
          }
        },
        // {
        //   title: `${i18n_lang.profitStatement40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.zb_CP ? `${row.zb_CP}%` : ``}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.profitStatement42}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement43}`,
          align: 'center',
          key: 'cb_manual_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_manual_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement44}`,
          align: 'center',
          key: 'cb_deposit_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_deposit_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement45}`,
          align: 'center',
          key: 'cb_loseearn_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_loseearn_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement46}`,
          align: 'center',
          key: 'cb_coupon_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_coupon_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement50}`,
          align: 'center',
          key: 'cb_withdrawal_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_withdrawal_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement51}`,
          align: 'center',
          key: 'cb_revenue_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_revenue_ratio_amount}</span>
          }
        }
      ]
    },
    {
      title: `${i18n_lang.profitStatement47}`,
      align: 'center',
      key: 'fee_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement48}`,
      align: 'center',
      key: 'bkge',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement49}`,
      align: 'center',
      key: 'date',
      minWidth: 100
    }
  ]
}

export const agentCntList = function(Vue) {
  const i18n_lang = Vue.$t('profitStatement')
  return [
    {
      title: `${i18n_lang.profitStatement25}`,
      align: 'center',
      key: 'user_name',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span
            class="user_link"
            on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: `${i18n_lang.profitStatement28}`,
      align: 'center',
      key: 'bet_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement29}`,
      align: 'center',
      key: 'loseearn_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement30}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_BY}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_GAME}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_LIVE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_QP}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_ESPORTS}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_ARCADE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_TABLE}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_SPORT}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_SABONG}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'BINGO',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.yk_BINGO}</span>
          }
        },
        // {
        //   title: `${i18n_lang.profitStatement40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.yk_CP}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.profitStatement41}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_BY ? `${row.zb_BY}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_GAME ? `${row.zb_GAME}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_LIVE ? `${row.zb_LIVE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_QP ? `${row.zb_QP}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_ESPORTS ? `${row.zb_ESPORTS}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_ARCADE ? `${row.zb_ARCADE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_TABLE ? `${row.zb_TABLE}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_SPORT ? `${row.zb_SPORT}%` : ``}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_SABONG ? `${row.zb_SABONG}%` : ``}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'BINGO',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zb_BINGO ? `${row.zb_BINGO}%` : ``}</span>
          }
        },
        // {
        //   title: `${i18n_lang.profitStatement40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.zb_CP ? `${row.zb_CP}%` : ``}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.profitStatement42}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.profitStatement43}`,
          align: 'center',
          key: 'cb_manual_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_manual_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement44}`,
          align: 'center',
          key: 'cb_deposit_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_deposit_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement45}`,
          align: 'center',
          key: 'cb_loseearn_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_loseearn_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement46}`,
          align: 'center',
          key: 'cb_coupon_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_coupon_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement50}`,
          align: 'center',
          key: 'cb_withdrawal_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_withdrawal_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.profitStatement51}`,
          align: 'center',
          key: 'cb_revenue_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_revenue_ratio_amount}</span>
          }
        }
      ]
    },
    {
      title: `${i18n_lang.profitStatement47}`,
      align: 'center',
      key: 'fee_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement48}`,
      align: 'center',
      key: 'bkge',
      minWidth: 100
    },
    {
      title: `${i18n_lang.profitStatement49}`,
      align: 'center',
      key: 'date',
      minWidth: 100
    }
  ]
}
