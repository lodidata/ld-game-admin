import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
        title: 'ID',
        key: 'id',
        align: 'center'
    },
    {
        title: '账号',
        key: 'admin_name',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '姓名',
        key: 'real_name',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '部门',
        key: 'department',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '职位',
        key: 'position',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '角色',
        key: 'role_name',
        minWidth: 80,
        align: 'center'
    },
    {
        title: '登录ip',
        key: 'last_login_ip',
        minWidth: 100,
        align: 'center'
    },
    {
        title: '最近登录的时间',
        key: 'updated_at',
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
                title={`确认${row.status == 0 ? '启用' : '停用'} ${row.admin_name} `}
                on-on-ok={_ => Vue.handleStop(row)}
                >
                    <Button
                        v-btn={54}
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
      title: '操作',
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              v-auth={51}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button>
            <Button
              v-auth={53}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
              改密
            </Button>
            <Poptip
              confirm
              title="确认删除 ?"
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button v-auth={52} type='error' size="small">
                删除
              </Button>
            </Poptip>
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