export const serviceList = function(Vue) {
  const i18n = Vue.$t('callCustomerService')
  return [
    {
      title: `${i18n.callCustomerService21}`,//客服名称
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: `${i18n.callCustomerService22}`,//最近一次导入时间
      align: 'center',
      minWidth: 100,
      key: 'put_time'
    },
    {
      title: `${i18n.callCustomerService23}`,//操作
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
                Vue.serviceListAmend(row)
              }
            }
          },
          `${i18n.callCustomerService24}`
        ),
        h(
          'Button',
          {
            attrs: { style: 'margin-left:5px' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.lookNameList(row)
              }
            }
          },
          `${i18n.callCustomerService25}`
        ),
        h(
          'Button',
          {
            attrs: { style: 'margin-left:5px' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.lookTelephoneList(row)
              }
            }
          },
          `${i18n.callCustomerService26}`
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.callCustomerService55}`
            },
            on: {
              'on-ok': () => {
                Vue.handleListDelete(row)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: 'error',
                  size: 'small'
                }
              },
              `${i18n.callCustomerService56}`
            )
          ]
        )
      ]
    }
  ]
}

export const nameList = function(Vue) {
  const i18n = Vue.$t('callCustomerService')
  return [
    {
      title: `${i18n.callCustomerService45}`,//名单名称
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: `${i18n.callCustomerService50}`,//总人数
      align: 'center',
      minWidth: 100,
      key: 'roll_num'
    },
    // {
    //   title: `${i18n.callCustomerService51}`,//名单总人数
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'register_num'
    // },
    {
      title: `${i18n.callCustomerService29}`,//注册充值人数
      align: 'center',
      minWidth: 100,
      key: 'recharge_num'
    },
    {
      title: `${i18n.callCustomerService30}`,//充值金额
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount',
      render: (h, { row }) => {
        return (
          <span>{ row.recharge_amount }</span>
        )
      }
    },
    {
      title: `${i18n.callCustomerService31}`,//平均充值金额
      align: 'center',
      minWidth: 100,
      key: 'recharge_mean',
      render: (h, { row }) => {
        return (
          <span>{ row.recharge_mean }</span>
        )
      }
    },
    {
      title: `${i18n.callCustomerService32}`,//导入时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.callCustomerService33}`,//操作
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
                Vue.lookTelephoneList(row)
              }
            }
          },
          `${i18n.callCustomerService34}`
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.callCustomerService55}`
            },
            on: {
              'on-ok': () => {
                Vue.handleDelete(row)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: 'error',
                  size: 'small'
                }
              },
              `${i18n.callCustomerService56}`
            )
          ]
        )
      ]
    }
  ]
}

export const telecomDetails = function(Vue) {
  const i18n = Vue.$t('callCustomerService')
  return [
    {
      title: `${i18n.callCustomerService35}`,//客服名称
      align: 'center',
      minWidth: 100,
      key: 'kefu_name'
    },
    {
      title: `${i18n.callCustomerService50}`,//总人数
      align: 'center',
      minWidth: 100,
      key: 'total'//roll_num
    },
    {
      title: `${i18n.callCustomerService37}`,//充值人数
      align: 'center',
      minWidth: 100,
      key: 'recharge_num'
    },
    {
      title: `${i18n.callCustomerService53}`,//充值金额
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount',
      render: (h, { row }) => {
        return (
          <span>{ row.recharge_amount }</span>
        )
      }
    },
    {
      title: `${i18n.callCustomerService57}`,//兑换金额
      align: 'center',
      minWidth: 100,
      key: 'withdraw_amount',
      render: (h, { row }) => {
        return (
          <span>{ row.withdraw_amount }</span>
        )
      }
    },
    {
      title: `${i18n.callCustomerService39}`,//平均充值金额
      align: 'center',
      minWidth: 100,
      key: 'recharge_mean',
      render: (h, { row }) => {
        return (
          <span>{ row.recharge_mean }</span>
        )
      }
    },
    {
      title: `${i18n.callCustomerService58}`,//彩金金额
      align: 'center',
      minWidth: 100,
      key: 'coupon_amount',
      render: (h, { row }) => {
        return (
          <span>{ row.coupon_amount }</span>
        )
      }
    }
  ]
}

export const telecomList = function(Vue) {
  const i18n = Vue.$t('callCustomerService')
  return [
    {
      title: `${i18n.callCustomerService40}`,//手机号
      align: 'center',
      minWidth: 100,
      key: 'mobile'
    },
    {
      title: `${i18n.callCustomerService41}`,//账号
      align: 'center',
      minWidth: 100,
      key: 'username'
    },
    {
      title: `${i18n.callCustomerService42}`,//注册时间
      align: 'center',
      minWidth: 100,
      key: 'register_time'
    },
    {
      title: `${i18n.callCustomerService52}`,//充值时间
      align: 'center',
      minWidth: 100,
      key: 'recharge_time'
    },
    {
      title: `${i18n.callCustomerService53}`,//充值金额
      align: 'center',
      minWidth: 100,
      key: 'recharge_amount',
      render: (h, { row }) => {
        return (
          <span>{ row.recharge_amount ? row.recharge_amount : '' }</span>
        )
      }
    }
  ]
}
