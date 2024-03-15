import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
        title: 'ID',
        key: 'id',
        minWidth: 100,
        align: 'center'
    },
    {
        title: '代理账号',
        key: 'agent_code',
        minWidth: 120,
        align: 'center'
    },
    {
        title: '密钥',
        key: 'secret_key',
        minWidth: 180,
        align: 'center',
        render(h, { row }) {
          return h('Tooltip', {
            props: { placement: 'top-start' },
          }, [
            h('div', {
              style: {
                  width: '140px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  webkitBoxOrient:'vertical',
                  webkitLineClamp: 2
              }
            }, row.secret_key? row.secret_key : ''),
            h('span', {
                slot: 'content', 
                style: { 
                  whiteSpace: 'normal', 
                  wordBreak: 'break-all' 
                } 
              }, row.secret_key? row.secret_key : '')
          ])
        }
    },
    {
        title: '品牌名称',
        key: 'brand_name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: '网站',
        key: 'site_url',
        minWidth: 140,
        align: 'center'
    },
    {
        title: '账单日期',
        key: 'bill_date',
        minWidth: 140,
        align: 'center'
    },
    {
        title: '货币',
        key: 'currency_type',
        minWidth: 180,
        align: 'center',
        // render(h, { row }) {
        //   return h('Tooltip', {
        //     props: { placement: 'top-start' },
        //   }, [
        //     h('div', {
        //       style: {
        //           width: '140px',
        //           textOverflow: 'ellipsis',
        //           whiteSpace: 'normal',
        //           overflow: 'hidden',
        //           display: '-webkit-box',
        //           webkitBoxOrient:'vertical',
        //           webkitLineClamp: 2
        //       }
        //     }, row.currency? row.currency : ''),
        //     h('span', { 
        //         slot: 'content', 
        //         style: { 
        //           whiteSpace: 'normal', 
        //           wordBreak: 'break-all' 
        //         } 
        //       }, row.currency? row.currency : '暂无配置货币')
        //   ])
        // }
    },
    {
        title: '钱包类型',
        key: 'wallet_type_str',
        minWidth: 100,
        align: 'center'
    },
    {
      title: '状态',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            {
                <Poptip
                confirm
                title={`确认${row.status == 0 ? '启用' : '停用'} `}
                on-on-ok={_ => Vue.handleStatus(row, 1)}
                >
                    <Button
                        type={row.status === 0 ? 'error' : 'success'}
                        size='small'
                        style='margin-right:5px'
                        >
                        {row.status === 0 ? '停用' : '启用'}
                    </Button>
                </Poptip>
            }
          </div>
        )
      }
    },
    {
      title: '登录注册',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          // <Tag color={Number(row.is_allow_login) === 1 ? 'green' : 'default'} type="dot">
          //   {Number(row.is_allow_login) === 1 ? '允许' : '不允许'}
          // </Tag>
          <div>
            {
                <Poptip
                confirm
                title={`确认${row.is_allow_login == 0 ? '启用' : '停用'} `}
                on-on-ok={_ => Vue.handleStatus(row, 2)}
                >
                    <Button
                        type={row.is_allow_login === 0 ? 'error' : 'success'}
                        size='small'
                        style='margin-right:5px'
                        >
                        {row.is_allow_login === 0 ? '停用' : '启用'}
                    </Button>
                </Poptip>
            }
          </div>
        )
      }
    },
    {
      title: '转账',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          // <Tag color={Number(row.is_allow_transfer) === 1 ? 'green' : 'default'} type="dot">
          //   {Number(row.is_allow_transfer) === 1 ? '允许' : '不允许'}
          // </Tag>
          <div>
            {
                <Poptip
                confirm
                title={`确认${row.is_allow_transfer == 0 ? '启用' : '停用'} `}
                on-on-ok={_ => Vue.handleStatus(row, 3)}
                >
                    <Button
                        type={row.is_allow_transfer === 0 ? 'error' : 'success'}
                        size='small'
                        style='margin-right:5px'
                        >
                        {row.is_allow_transfer === 0 ? '停用' : '启用'}
                    </Button>
                </Poptip>
            }
          </div>
        )
      }
    },
    {
      title: '注单',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          // <Tag color={Number(row.is_allow_order) === 1 ? 'green' : 'default'} type="dot">
          //   {Number(row.is_allow_order) === 1 ? '允许' : '不允许'}
          // </Tag>
          <div>
            {
                <Poptip
                confirm
                title={`确认${row.is_allow_order == 0 ? '启用' : '停用'} `}
                on-on-ok={_ => Vue.handleStatus(row, 4)}
                >
                    <Button
                        v-btn={12}
                        type={row.is_allow_order === 0 ? 'error' : 'success'}
                        size='small'
                        style='margin-right:5px'
                        >
                        {row.is_allow_order === 0 ? '停用' : '启用'}
                    </Button>
                </Poptip>
            }
          </div>
        )
      }
    },
    {
      title: '限转金额',
      key: 'limit_recharge_money',
      minWidth: 140,
      align: 'center'
    },
    {
        title: '开通时间',
        key: 'created_at',
        minWidth: 140,
        align: 'center'
    },
    {
        title: '更新时间',
        key: 'updated_at',
        minWidth: 140,
        align: 'center'
    },
    {
      title: '操作',
      minWidth: 200,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              v-auth={13}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'ip')}
            >
              IP加白
            </Button>
            <Button
              v-auth={10}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button>
            <Button
              v-auth={14}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'open')}
            >
              代理游戏
            </Button>
          </div>
        )
      },
      myExt: {
        label: 'handle',
        require: true
      }
    }
  ]
}