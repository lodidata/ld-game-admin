import { Button } from 'iview'
export const dataList = function(Vue) {
  const i18n = Vue.$t('channelReport')
  return [
    {
      title: `${i18n.channelReport9}`,//渠道号
      align: 'center',
      minWidth: 100,
      key: 'channel_id',
      myExt: {
        label: 'channel_id'
      }
    },
    {
      title: `${i18n.channelReport10}`,//渠道名称
      align: 'center',
      minWidth: 100,
      key: 'channel_name',
      myExt: {
        label: 'channel_name'
      }
    },
    {
      title: `${i18n.channelReport47}`,//总访问次数
      align: 'center',
      minWidth: 100,
      key: 'click_num',
      myExt: {
        label: 'click_num'
      },
      // render: (h, { row }) => {
      //   return <Button type='primary' size='small' on-click={_ => Vue.lookNunber(row, 1)}>{`${i18n.channelReport59}`}</Button>
      // }
    },
    {
      title: `${i18n.channelReport48}`,//独立访问次数
      align: 'center',
      minWidth: 100,
      key: 'distinct_click',
      myExt: {
        label: 'distinct_click'
      },
      // render: (h, { row }) => {
      //   return <Button type='primary' size='small' on-click={_ => Vue.lookNunber(row, 2)}>{`${i18n.channelReport59}`}</Button>
      // }
    },
    {
      title: `${i18n.channelReport49}`,//新增访问次数
      align: 'center',
      minWidth: 100,
      key: 'first_click_num',
      myExt: {
        label: 'first_click_num'
      }
    },
    {
      title: `${i18n.channelReport11}`,//总注册人数
      align: 'center',
      minWidth: 100,
      key: 'register_num',
      myExt: {
        label: 'register_num'
      }
    },
    {
      title: `${i18n.channelReport50}`,//总注册IP数
      align: 'center',
      minWidth: 100,
      key: 'register_ip_count',
      myExt: {
        label: 'register_ip_count'
      }
    },
    {
      title: `${i18n.channelReport29}`,//新增注册人数
      align: 'center',
      minWidth: 100,
      key: 'first_register_num',
      myExt: {
        label: 'first_register_num'
      }
    },
    {
      title: `${i18n.channelReport51}`,//新增注册IP
      align: 'center',
      minWidth: 100,
      key: 'first_register_ip_count',
      myExt: {
        label: 'first_register_ip_count'
      }
    },
    {
      title: `${i18n.channelReport30}`,//新充人数
      align: 'center',
      minWidth: 100,
      key: 'first_recharge_user',
      myExt: {
        label: 'first_recharge_user'
      }
    },
    {
      title: `${i18n.channelReport31}`,//新充充值金额
      align: 'center',
      minWidth: 100,
      key: 'first_recharge',
      myExt: {
        label: 'first_recharge'
      }
    },
    {
      title: `${i18n.channelReport32}`,//新充取款金额
      align: 'center',
      minWidth: 100,
      key: 'first_withdraw',
      myExt: {
        label: 'first_withdraw'
      }
    },
    {
      title: `${i18n.channelReport33}`,//新充投注金额
      align: 'center',
      minWidth: 100,
      key: 'first_bet',
      myExt: {
        label: 'first_bet'
      }
    },
    {
      title: `${i18n.channelReport34}`,//新充派彩金额
      align: 'center',
      minWidth: 100,
      key: 'first_prize',
      myExt: {
        label: 'first_prize'
      }
    },
    {
      title: `${i18n.channelReport35}`,//新充投注派彩差
      align: 'center',
      minWidth: 100,
      key: 'first_diff_tzpc',
      myExt: {
        label: 'first_diff_tzpc'
      }
    },
    {
      title: `${i18n.channelReport12}`,//充值人数
      align: 'center',
      minWidth: 100,
      key: 'cz_person',
      myExt: {
        label: 'cz_person'
      }
    },
    {
      title: `${i18n.channelReport13}`,//充值金额
      align: 'center',
      minWidth: 100,
      key: 'cz_amount',
      myExt: {
        label: 'cz_amount'
      }
    },
    {
      title: `${i18n.channelReport14}`,//取款人数
      align: 'center',
      minWidth: 100,
      key: 'qk_person',
      myExt: {
        label: 'qk_person'
      }
    },
    {
      title: `${i18n.channelReport15}`,//取款金额
      align: 'center',
      minWidth: 100,
      key: 'qk_amount',
      myExt: {
        label: 'qk_amount'
      }
    },
    {
      title: `${i18n.channelReport16}`,//存取款差额
      align: 'center',
      minWidth: 100,
      key: 'diff_cqk',
      myExt: {
        label: 'diff_cqk'
      }
    },
    {
      title: `${i18n.channelReport17}`,//投注金额
      align: 'center',
      minWidth: 100,
      key: 'tz_amount',
      myExt: {
        label: 'tz_amount'
      }
    },
    {
      title: `${i18n.channelReport18}`,//派彩金额
      align: 'center',
      minWidth: 100,
      key: 'pc_amount',
      myExt: {
        label: 'pc_amount'
      }
    },
    {
      title: `${i18n.channelReport19}`,//投注派彩差额
      align: 'center',
      minWidth: 100,
      key: 'diff_tzpc',
      myExt: {
        label: 'diff_tzpc'
      }
    },
    {
      title: `${i18n.channelReport20}`,//活动彩金
      align: 'center',
      minWidth: 100,
      key: 'hd_amount',
      myExt: {
        label: 'hd_amount'
      }
    },
    {
      title: `${i18n.channelReport21}`,//回水金额
      align: 'center',
      minWidth: 100,
      key: 'hs_amount',
      myExt: {
        label: 'hs_amount'
      }
    },
    {
      title: `${i18n.channelReport22}`,//晋升彩金
      align: 'center',
      minWidth: 100,
      key: 'js_amount',
      myExt: {
        label: 'js_amount'
      }
    },
    {
      title: `${i18n.channelReport23}`,//转卡彩金
      align: 'center',
      minWidth: 100,
      key: 'zk_amount',
      myExt: {
        label: 'zk_amount'
      }
    },
    {
      title: `${i18n.channelReport24}`,//返佣总金额
      align: 'center',
      minWidth: 100,
      key: 'fyz_amount',
      myExt: {
        label: 'fyz_amount'
      }
    },
    {
      title: `${i18n.channelReport25}`,//月俸
      align: 'center',
      minWidth: 100,
      key: 'award_money',
      myExt: {
        label: 'award_money'
      }
    },
    // {
    //   title: `${i18n.channelReport26}`,//时间
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'count_date'
    // },
    {
      title: `${i18n.channelReport36}`,//月俸
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'cz'
      },
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
                Vue.handleDetails(row)
              }
            }
          },
          `${i18n.channelReport37}`
        )
      ]
    }
  ]
}

export const dataDetailsList = function(Vue) {
  const i18n = Vue.$t('channelReport')
  return [
    {
      title: `${i18n.channelReport9}`,//渠道号
      align: 'center',
      minWidth: 100,
      key: 'channel_id'
    },
    {
      title: `${i18n.channelReport10}`,//渠道名称
      align: 'center',
      minWidth: 100,
      key: 'channel_name'
    },
    {
      title: `${i18n.channelReport47}`,//总访问次数
      align: 'center',
      minWidth: 100,
      key: 'click_num'
    },
    {
      title: `${i18n.channelReport48}`,//独立访问次数
      align: 'center',
      minWidth: 100,
      key: 'distinct_click'
    },
    {
      title: `${i18n.channelReport49}`,//新增访问次数
      align: 'center',
      minWidth: 100,
      key: 'first_click_num',
    },
    {
      title: `${i18n.channelReport11}`,//总注册人数
      align: 'center',
      minWidth: 100,
      key: 'register_num'
    },
    {
      title: `${i18n.channelReport50}`,//总注册IP数
      align: 'center',
      minWidth: 100,
      key: 'register_ip_count',
    },
    {
      title: `${i18n.channelReport29}`,//新增注册人数
      align: 'center',
      minWidth: 100,
      key: 'first_register_num'
    },
    {
      title: `${i18n.channelReport51}`,//新增注册IP
      align: 'center',
      minWidth: 100,
      key: 'first_register_ip_count',
    },
    {
      title: `${i18n.channelReport30}`,//新充人数
      align: 'center',
      minWidth: 100,
      key: 'first_recharge_user'
    },
    {
      title: `${i18n.channelReport31}`,//新充充值金额
      align: 'center',
      minWidth: 100,
      key: 'first_recharge'
    },
    {
      title: `${i18n.channelReport32}`,//新充取款金额
      align: 'center',
      minWidth: 100,
      key: 'first_withdraw'
    },
    {
      title: `${i18n.channelReport33}`,//新充投注金额
      align: 'center',
      minWidth: 100,
      key: 'first_bet'
    },
    {
      title: `${i18n.channelReport34}`,//新充派彩金额
      align: 'center',
      minWidth: 100,
      key: 'first_prize'
    },
    {
      title: `${i18n.channelReport35}`,//新充投注派彩差
      align: 'center',
      minWidth: 100,
      key: 'first_diff_tzpc'
    },
    {
      title: `${i18n.channelReport12}`,//充值人数
      align: 'center',
      minWidth: 100,
      key: 'cz_person'
    },
    {
      title: `${i18n.channelReport13}`,//充值金额
      align: 'center',
      minWidth: 100,
      key: 'cz_amount'
    },
    {
      title: `${i18n.channelReport14}`,//取款人数
      align: 'center',
      minWidth: 100,
      key: 'qk_person'
    },
    {
      title: `${i18n.channelReport15}`,//取款金额
      align: 'center',
      minWidth: 100,
      key: 'qk_amount'
    },
    {
      title: `${i18n.channelReport16}`,//存取款差额
      align: 'center',
      minWidth: 100,
      key: 'diff_cqk'
    },
    {
      title: `${i18n.channelReport17}`,//投注金额
      align: 'center',
      minWidth: 100,
      key: 'tz_amount'
    },
    {
      title: `${i18n.channelReport18}`,//派彩金额
      align: 'center',
      minWidth: 100,
      key: 'pc_amount'
    },
    {
      title: `${i18n.channelReport19}`,//投注派彩差额
      align: 'center',
      minWidth: 100,
      key: 'diff_tzpc'
    },
    {
      title: `${i18n.channelReport20}`,//活动彩金
      align: 'center',
      minWidth: 100,
      key: 'hd_amount'
    },
    {
      title: `${i18n.channelReport21}`,//回水金额
      align: 'center',
      minWidth: 100,
      key: 'hs_amount'
    },
    {
      title: `${i18n.channelReport22}`,//晋升彩金
      align: 'center',
      minWidth: 100,
      key: 'js_amount'
    },
    {
      title: `${i18n.channelReport23}`,//转卡彩金
      align: 'center',
      minWidth: 100,
      key: 'zk_amount'
    },
    {
      title: `${i18n.channelReport24}`,//返佣总金额
      align: 'center',
      minWidth: 100,
      key: 'fyz_amount'
    },
    {
      title: `${i18n.channelReport25}`,//月俸
      align: 'center',
      minWidth: 100,
      key: 'award_money'
    },
    {
      title: `${i18n.channelReport26}`,//时间
      align: 'center',
      minWidth: 100,
      key: 'count_date'
    }
    // {
    //   title: `操作`,//月俸
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
    //             Vue.handleDetails(row)
    //           }
    //         }
    //       },
    //       `详情`
    //     )
    //   ]
    // }
  ]
}
