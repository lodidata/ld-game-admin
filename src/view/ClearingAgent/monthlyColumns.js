export const collectData = function(Vue) {
  const i18n_lang = Vue.$t('ClearingAgent')
  return [
    {
      title: `${i18n_lang.ClearingAgent17}`,
      align: 'center',
      key: 'game_type_name',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent18}`,
      align: 'center',
      key: 'game_bet_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent19}`,
      align: 'center',
      key: 'game_prize_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent20}`,
      align: 'center',
      key: 'profit',
      minWidth: 100
    },
  ]
}

export const agentDetails = function(Vue) {
  const i18n_lang = Vue.$t('ClearingAgent')
  return [
    // {
    //   title: `${i18n_lang.ClearingAgent21}`,
    //   align: 'center',
    //   key: 'deal_log_no',
    //   minWidth: 100
    // },
    {
      title: `${i18n_lang.ClearingAgent22}`,
      align: 'center',
      key: 'user_name',
      minWidth: 100,
      render: (h, { row }) => {
        return (
          <span
            class="user_link"
            // on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: `${i18n_lang.ClearingAgent23}`,
      align: 'center',
      key: 'agent_name',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent54}`,
      align: 'center',
      key: 'self_bet_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent29}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.ClearingAgent31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_BY}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_GAME}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_LIVE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_QP}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_ESPORTS}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_ARCADE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_TABLE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_SPORT}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_SABONG}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'BINGO',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.tz_BINGO}</span>
          }
        },
        // {
        //   title: `${i18n_lang.ClearingAgent40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.tz_CP}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.ClearingAgent53}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.ClearingAgent31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_BY}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_GAME}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_LIVE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_QP}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_ESPORTS}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_ARCADE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_TABLE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_SPORT}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_SABONG}</span>
          }
        },
        {
          title: `BINGO`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.self_bet_BINGO}</span>
          }
        },
        // {
        //   title: `${i18n_lang.ClearingAgent40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.tz_CP}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.ClearingAgent30}`,
      align: 'center',
      children: [
        {
          title: `${i18n_lang.ClearingAgent31}`,
          align: 'center',
          key: 'BY',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_BY}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent32}`,
          align: 'center',
          key: 'GAME',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_GAME}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent33}`,
          align: 'center',
          key: 'LIVE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_LIVE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent34}`,
          align: 'center',
          key: 'QP',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_QP}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent35}`,
          align: 'center',
          key: 'ESPORTS',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_ESPORTS}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent36}`,
          align: 'center',
          key: 'ARCADE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_ARCADE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent37}`,
          align: 'center',
          key: 'TABLE',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_TABLE}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent38}`,
          align: 'center',
          key: 'SPORT',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_SPORT}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent39}`,
          align: 'center',
          key: 'SABONG',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.zc_SABONG}</span>
          }
        },
        // {
        //   title: `${i18n_lang.ClearingAgent40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.zc_CP}</span>
        //   }
        // }
      ]
    },
    {
      title: `${i18n_lang.ClearingAgent42}`,
      align: 'center',
      children: [
        // {
        //   title: `${i18n_lang.ClearingAgent31}`,
        //   align: 'center',
        //   key: 'BY',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_BY}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent32}`,
        //   align: 'center',
        //   key: 'GAME',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_GAME}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent33}`,
        //   align: 'center',
        //   key: 'LIVE',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_LIVE}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent34}`,
        //   align: 'center',
        //   key: 'QP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_QP}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent35}`,
        //   align: 'center',
        //   key: 'ESPORTS',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_ESPORTS}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent36}`,
        //   align: 'center',
        //   key: 'ARCADE',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_ARCADE}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent37}`,
        //   align: 'center',
        //   key: 'TABLE',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_TABLE}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent38}`,
        //   align: 'center',
        //   key: 'SPORT',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_SPORT}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent39}`,
        //   align: 'center',
        //   key: 'SABONG',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_SABONG}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent40}`,
        //   align: 'center',
        //   key: 'CP',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_CP}</span>
        //   }
        // },
        // {
        //   title: `${i18n_lang.ClearingAgent43}`,
        //   align: 'center',
        //   key: 'cb_other',
        //   minWidth: 100,
        //   render(h, { row }) {
        //     return <span>{row.cb_other}</span>
        //   }
        // },
        {
          title: `${i18n_lang.ClearingAgent48}`,
          align: 'center',
          key: 'cb_all_games',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_all_games}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent45}`,
          align: 'center',
          key: 'cb_deposit_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_deposit_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent49}`,
          align: 'center',
          key: 'cb_revenue_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_revenue_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent47}`,
          align: 'center',
          key: 'cb_coupon_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_coupon_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent46}`,
          align: 'center',
          key: 'cb_manual_ratio_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.cb_manual_ratio_amount}</span>
          }
        },
        {
          title: `${i18n_lang.ClearingAgent44}`,
          align: 'center',
          key: 'fee_amount',
          minWidth: 100,
          render(h, { row }) {
            return <span>{row.fee_amount}</span>
          }
        }
      ]
    },
    {
      title: `${i18n_lang.ClearingAgent24}`,
      align: 'center',
      key: 'agent_cnt',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent25}`,
      align: 'center',
      key: 'bet_amount',
      minWidth: 100
    },
    // {
    //   title: `${i18n_lang.ClearingAgent26}`,
    //   align: 'center',
    //   key: 'proportion',
    //   minWidth: 100
    // },
    {
      title: `${i18n_lang.ClearingAgent27}`,
      align: 'center',
      key: 'settle_amount',
      minWidth: 100
    },
    {
      title: `${i18n_lang.ClearingAgent28}`,
      align: 'center',
      key: 'date',
      minWidth: 100
    },
  ]
}
