import { Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('thirdPayment')
  return [
    {
        title: `${i18n.newThirdPayment58}`,//支付类型
        align: 'center',
        key: 'pay_config_type',
        minWidth: 80
    },
    {
      title: `${i18n.newThirdPayment53}`,//通道名称
      align: 'center',
      key: 'name',
      minWidth: 80
    },
    {
      title: `${i18n.newThirdPayment54}`,//所属渠道
      align: 'center',
      key: 'channel_name',
      minWidth: 80
    },
    {
      title: `${i18n.newThirdPayment57}`,//通道道LOGO
      align: 'center',
      key: 'logo',
      minWidth: 80,
      render(h, { row }) {
        return row.logo ? <img src={row.logo} style="width: 160px;height: auto;"/> : <span>{i18n.newThirdPayment39}</span>
      }
    },
    {
      title: `${i18n.newThirdPayment31}`,//角标
      align: 'center',
      key: 'img',
      minWidth: 80,
      render(h, { row }) {
        return row.img ? <img src={row.img} style="width: 50px;height: auto;"/> : <span>{i18n.newThirdPayment39}</span>
      }
    },
    {
      title: `${i18n.newThirdPayment32}`,//文本
      align: 'center',
      key: 'text',
      minWidth: 80
    },
    {
      title: `${i18n.newThirdPayment33}`,//排序
      align: 'center',
      key: 'sort',
      minWidth: 80
    },
    {
      title: `${i18n.newThirdPayment55}`,//通道状态
      align: 'center',
      key: 'status',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.status ? `${i18n.newThirdPayment36}` : `${i18n.newThirdPayment37}`}</span>
      }
    },
    {
      title: `${i18n.newThirdPayment38}`,//操作
      align: 'center',
      minWidth: 200,
      render(h, { row, index }) {
        return (
        <div>
          <Poptip
            confirm
            title={`${row.status ? `${i18n.newThirdPayment42}` : `${i18n.newThirdPayment43}`}?`}
            on-on-ok={_ => Vue.handleStatus(row)}
          >
            <Button
              type={row.status ? 'error' : 'success'}
              size='small'
              style='margin-right:5px'
            >
              {row.status ? `${i18n.newThirdPayment44}` : `${i18n.newThirdPayment45}`}
            </Button>
          </Poptip>
          <Button
            type='primary' size='small' style='margin-right:5px'
            on-click={_ => Vue.handleSave(row)}>
            {i18n.newThirdPayment46}
          </Button>
        </div>
        )
      }
    }
  ]
}

// {
//             index > 0 && <Button
//             type='success' size='small' style='margin-right:5px'
//             on-click={_ => Vue.swapItems(index, index - 1)}>{i18n.newThirdPayment40}</Button>
//           },
//           {
//             index < Vue.dataSource.length - 1 && <Button
//             type='success' size='small' style='margin-right:5px'
//             on-click={_ => Vue.swapItems(index, index + 1)}>{i18n.newThirdPayment41}</Button>
//           },
