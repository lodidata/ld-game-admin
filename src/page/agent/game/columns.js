import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
        title: 'ID',
        key: 'id',
        minWidth: 50,
        align: 'center'
    },
    {
        title: '厂商',
        key: 'menu_type',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '管理后台地址',
        key: 'admin_url',
        minWidth: 120,
        align: 'center'
    },
    {
        title: '后台账户',
        key: 'agent_account',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '后台密码',
        key: 'password',
        minWidth: 80,
        align: 'center'
    },
    {
      title: '第三方游戏代理账号',
      key: 'api_agent',
      minWidth: 140,
      align: 'center'
    },
    {
      title: '第三方游戏代理密钥',
      key: 'api_key',
      minWidth: 140,
      align: 'center'
    },
    {
      title: '状态',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          
          <div>
            <Poptip
              confirm
              title={`确认 ${Number(row.status) === 1 ? '停用' : '启用'} ?`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button v-btn={24} type={Number(row.status) === 1 ? 'success' : 'error'} size="small">
                {Number(row.status) === 1 ? '启用' : '停用'}
              </Button>
            </Poptip>
          </div>
        )
      }
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
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`确认 ${'删除'} ?`}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button v-auth={23} style="margin-right:5px" type="error" size="small">
                {'删除'}
              </Button>
            </Poptip>
            <Button
              v-auth={22}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row)}
            >
              编辑
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