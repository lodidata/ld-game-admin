import { Tag } from 'iview'
import { MathDiv } from '@/libs/formatMath'

export default function(Vue) {
  const i18n = Vue.$t('memberManage')
  return [
    {
      type: 'selection',
      width: 30,
      title: '',
      fixed: 'left',
      align: 'center'
    },
    {
      title: `${i18n.memberManage104}`,//用户ID
      align: 'center',
      minWidth: 100,
      key: 'id'
    },
    {
      title: i18n.memberManage62,//会员账号
      align: 'center',
      minWidth: 100,
      fixed: 'left',
      key: 'username',
      render: (h, { row }) => {
        return (
          <span
            class={row.tags === 4 || row.tags === 7 || row.tags === i18n.memberManage63 ? 'red' : 'user_link'}
            on-click={_ => Vue.handleUserDetail(row)}
          >
            {row.username}
          </span>
        )
      }
    },
    {
      title: i18n.memberManage64,//真实姓名
      align: 'center',
      minWidth: 100,
      key: 'truename'
    },
    {
      title: i18n.memberManage65,//上级代理
      align: 'center',
      minWidth: 100,
      key: 'agent'
    },
    {
      title: i18n.memberManage94,//固定占成
      align: 'center',
      minWidth: 100,
      key: 'proportion_type',
      render(h, { row }) {
        return <span>{row.proportion_type == 1 ? i18n.memberManage99 : i18n.memberManage100}</span>
      }
    },
    {
      title: i18n.memberManage109,//盈亏占成
      align: 'center',
      minWidth: 100,
      key: 'profit_loss_value',
      render(h, { row }) {
        return <span>{row.profit_loss_value ? i18n.memberManage89 : i18n.memberManage90}</span>
      }
    },
    {
      title: i18n.memberManage66,//账号余额
      align: 'center',
      minWidth: 100,
      key: 'balance',
      sortable: 'custom',
      render(h, { row }) {
        const balance = Number(row.balance) || 0
        return <span>{MathDiv(balance, 1)}</span>
      }
    },
    {
      title: i18n.memberManage67,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'level',
      sortable: 'custom'
    },
    {
      title: i18n.memberManage68,//账号状态
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <Tag type='dot' color={Number(row.state) === 0 ? 'default' : 'success'}>
            {Number(row.state) === 0 ? i18n.memberManage69 : i18n.memberManage70}
          </Tag>
        )
      },
      myExt: {
        label: 'Tag'
      }
    },
    {
      title: i18n.memberManage71,//手机号码
      align: 'center',
      minWidth: 100,
      key: 'mobile'
    },
    {
      title: i18n.memberManage72,//最近登录时间/IP
      align: 'center',
      minWidth: 150,
      key: 'last_login',
      sortable: 'custom',
      render(h, { row }) {
        return (
          <div>
            <p>{row.last_login}</p>
            <p>{row.last_ip}</p>
          </div>
        )
      }
    },
    {
      title: i18n.memberManage73,//注册时间/IP
      align: 'center',
      minWidth: 150,
      key: 'created',
      sortable: 'custom',
      render(h, { row }) {
        return (
          <div>
            <p>{row.created}</p>
            <p>{row.ip}</p>
          </div>
        )
      }
    },
    {
      title: i18n.memberManage74,//注册渠道
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        let txt = ''
        switch (Number(row.origin)) {
          case 1:
            txt = 'pc'
            break
          case 2:
            txt = 'h5'
            break
          case 3:
            txt = 'ios'
            break
          case 4:
            txt = 'android'
            break
          default:
            break
        }
        return <span>{txt}</span>
      }
    },
    {
      title: i18n.memberManage113,//渠道号
      align: 'center',
      minWidth: 100,
      key: 'channel_id'
    },
    {
      title: i18n.memberManage102,//备注
      align: 'center',
      minWidth: 100,
      key: 'forbidden_des'
    },
    {
      title: i18n.memberManage75,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.memberManage76} ${row.username} ${row.state === 1 ? i18n.memberManage77 : i18n.memberManage78}?`
            },
            on: {
              'on-ok': () => {
                Vue.handleState(row, row.state === 1 ? 0 : 1)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: row.state === 1 ? 'error' : 'success',
                  size: 'small'
                }
              },
              row.state === 1 ? i18n.memberManage77 : i18n.memberManage78
            )
          ]
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.memberManage76} ${row.username} ${row.agent_switch === 1 ? i18n.memberManage79 : i18n.memberManage80}?`
            },
            on: {
              'on-ok': () => {
                Vue.handleAgent(row, row.agent_switch === 1 ? 0 : 1)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: row.agent_switch === 1 ? 'error' : 'info',
                  size: 'small'
                }
              },
              row.agent_switch === 1 ? i18n.memberManage79 : i18n.memberManage80
            )
          ]
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
                Vue.handleTransfer(row)
              }
            }
          },
          i18n.memberManage81
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
                Vue.handleUserDetail(row)
              }
            }
          },
          i18n.memberManage82
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
                Vue.handleAmendAccounted(row)
              }
            }
          },
          i18n.memberManage98
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
                Vue.handleAmendProfit(row)
              }
            }
          },
          i18n.memberManage109
        )
      ]
    }
  ]
}
