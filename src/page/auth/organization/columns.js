import { Button, Tag, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('adminList')
  return [
    {
      title: '序号',
      align: 'center',
      key: 'id',
      minWidth: 100
    },
    {
      title: '组织编号',
      align: 'center',
      key: 'name_code',
      minWidth: 100
    },
    {
      title: '组织名称',
      align: 'center',
      key: 'name',
      minWidth: 100
    },
    {
      title: '管理账号',
      align: 'center',
      key: 'username',
      minWidth: 100
    },
    {
      title: '管理范围',
      align: 'center',
      key: 'isTypeDesc',
      minWidth: 100
    },
    {
      title: '登录地址',
      align: 'center',
      key: 'login_url',
      minWidth: 100
    },
    {
        title: '创建时间',
        align: 'center',
        key: 'create_time',
        minWidth: 100
    },
    {
      title: i18n.adminList37,
      align: 'center',
      key: 'status',
      render(h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`${row.status == 0 ? '组织停用，此组织下的所有账号将不能登录系统， 确认停用组织吗' : '确认启用组织'}`}
              on-on-ok={_ => Vue.handleStop(row)}
            >
              <Button
                v-btn={500}
                type={row.status === 1 ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 1 ? '禁用' : '开启'}
              </Button>
            </Poptip>
          </div>
        )
      },
      minWidth: 100
    },
    {
      title: i18n.adminList40,
      align: 'center',
      minWidth: 180,
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              v-auth={502}
              on-click={_ => Vue.handleOpenCopyModal(row)}
            >
              {'查看管理密码'}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              v-auth={499}
              on-click={_ => Vue.handleOpenModal('edit', row)}
            >
              {'编辑'}
            </Button>
            {
              row.status ? <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                v-auth={501}
                on-click={_ => Vue.handleOpenModal('delete', row)}
              >
                {'注销'}
              </Button> : ''
            }
          </div>
        )
      }
    }
  ]
}