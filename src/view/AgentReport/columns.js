import { Button } from 'iview'

export default Vue => {
  const i18n = Vue.$t('agentReport')
  return [
    {
      title: i18n.agentReport10,
      align: 'center',
      minWidth: 80,
      key: 'user_name',
      fixed: 'left',
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.agentReport34 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.agentReport11,
      align: 'center',
      minWidth: 80,
      key: 'real_name',
      render(h, { row }) {
        return <span>{row.real_name}</span>
      }
    },
    {
      title: i18n.agentReport42,
      align: 'center',
      minWidth: 80,
      key: 'proportion_value',
      render(h, { row }) {
        return <span on-click={_ => Vue.proportionValueFn(row.proportion_value)}>{row.proportion_value ? i18n.agentReport43 : ''}</span>
      }
    },
    {
      title: i18n.agentReport12,
      align: 'center',
      minWidth: 80,
      key: 'agent_cnt',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.agent_cnt || 0}</span>
      }
    },
    {
      title: i18n.agentReport13,
      align: 'center',
      minWidth: 80,
      key: 'agent_inc_cnt',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.agent_inc_cnt}</span>
      }
    },
    {
      title: i18n.agentReport14,
      align: 'center',
      minWidth: 80,
      key: 'first_deposit_cnt',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.first_deposit_cnt}</span>
      }
    },
    {
      title: i18n.agentReport35,
      align: 'center',
      minWidth: 80,
      key: 'deposit_user_num',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.deposit_user_num}</span>
      }
    },
    {
      title: i18n.agentReport36,
      align: 'center',
      minWidth: 80,
      key: 'new_register_deposit_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.new_register_deposit_amount}</span>
      }
    },
    {
      title: i18n.agentReport37,
      align: 'center',
      minWidth: 80,
      key: 'new_register_deposit_avg',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.new_register_deposit_avg}</span>
      }
    },
    {
      title: i18n.agentReport15,
      align: 'center',
      minWidth: 80,
      key: 'balance_amount',
      sortable: 'custom',
      render(h, { row }) {
        return <span>{row.balance_amount}</span>
      }
    },
    {
      title: `${i18n.agentReport44}`,//直属情况
      align: 'center',
      children: [
        {
          title: `${i18n.agentReport45}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_people',
        },
        {
          title: `${i18n.agentReport46}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_cz_people',
        },
        {
          title: `${i18n.agentReport47}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_cz_money',
          render(h, { row }) {
            return <span>{row.sub_cz_money}</span>
          }
        },
        {
          title: `${i18n.agentReport48}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_qk_num',
          render(h, { row }) {
            return <span>{row.sub_qk_num}</span>
          }
        },
        {
          title: `${i18n.agentReport49}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_sc_people',
        },
        {
          title: `${i18n.agentReport50}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_sc_money',
          render(h, { row }) {
            return <span>{row.sub_sc_money}</span>
          }
        },
        {
          title: `${i18n.agentReport51}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_sc_qk_num',
          render(h, { row }) {
            return <span>{row.sub_sc_qk_num}</span>
          }
        },
        {
          title: `${i18n.agentReport52}`,
          align: 'center',
          minWidth: 100,
          key: 'sub_cz_avg',
          render(h, { row }) {
            return <span>{row.sub_cz_avg}</span>
          }
        }
      ]
    },
    {
      title: i18n.agentReport16,
      align: 'center',
      children: [
        {
          title: i18n.agentReport17,
          align: 'center',
          minWidth: 100,
          key: 'deposit_agent_amount',
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.deposit_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport18,
          align: 'center',
          minWidth: 100,
          key: 'withdrawal_agent_amount',
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.withdrawal_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport19,
          align: 'center',
          key: 'dw_drop_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return (
              <span class={Number(row.dw_drop_amount) < 0 ? 'red' : ''}>{row.dw_drop_amount}</span>
            )
          }
        }
      ]
    },
    {
      title: i18n.agentReport20,
      align: 'center',
      children: [
        {
          title: i18n.agentReport21,
          align: 'center',
          key: 'bet_agent_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.bet_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport22,
          align: 'center',
          key: 'prize_agent_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.prize_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport23,
          align: 'center',
          key: 'bs_drop_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return (
              <span class={Number(row.bs_drop_amount) < 0 ? 'red' : ''}>{row.bs_drop_amount}</span>
            )
          }
        }
      ]
    },
    {
      title: i18n.agentReport24,
      align: 'center',
      children: [
        {
          title: i18n.agentReport25,
          align: 'center',
          key: 'coupon_agent_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.coupon_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport26,
          align: 'center',
          key: 'return_agent_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.return_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport27,
          align: 'center',
          key: 'promotion_agent_winnings',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.promotion_agent_winnings}</span>
          }
        },
        {
          title: i18n.agentReport28,
          align: 'center',
          key: 'turn_card_agent_winnings',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.turn_card_agent_winnings}</span>
          }
        },
        {
          title: i18n.agentReport29,
          align: 'center',
          key: 'back_agent_amount',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.back_agent_amount}</span>
          }
        },
        {
          title: i18n.agentReport30,
          align: 'center',
          key: 'award',
          minWidth: 100,
          sortable: 'custom',
          render(h, { row }) {
            return <span>{row.award}</span>
          }
        }
      ]
    },
    {
      title: i18n.agentReport31,
      align: 'center',
      key: 'register_time',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.register_time}</span>
      }
    },
    {
      title: i18n.agentReport32,
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return (
          <Button
            type='primary'
            size='small'
            style='margin-right:5px'
            disabled={!(row.agent_cnt > 0)}
            on-click={_ => Vue.handleSearchAgent(row)}
          >
            {i18n.agentReport33}
          </Button>
        )
      }
    }
  ]
}
