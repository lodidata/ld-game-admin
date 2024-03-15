export default function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: i18n.components174,//会员账号
      align: 'center',
      key: 'name'
    },
    {
      title: i18n.components175,//会员等级
      align: 'center',
      key: 'ranting'
    },
    {
      title: i18n.components176,//注册时间
      align: 'center',
      key: 'created'
    },
    {
      title: i18n.components177,//下级人数
      align: 'center',
      key: 'inferisors_all'
    },
    {
      title: i18n.components274,//盈亏占成
      align: 'center',
      key: 'profit_loss_value',
      render(h, { row }) {
        return <span>{row.profit_loss_value ? `${row.profit_loss_value}%` : ''}</span>
      }
    },
    {
      title: `${i18n.components276}`,//占成设置
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
                Vue.handleAmendProfit(row)
              }
            }
          },
          i18n.components274
        )
      ]
    }
  ]
}
