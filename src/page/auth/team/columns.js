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
      title: '成员账号',
      align: 'center',
      key: 'username',
      minWidth: 100
    },
    {
      title: '名称',
      align: 'center',
      key: 'name',
      minWidth: 100
    },
    {
      title: '账号状态',
      align: 'center',
      key: 'status',
      render(h, { row }) {
        return (
          <Tag color={row.status === 0 ? 'success' : 'default'} type='dot'>
            {row.status === 0 ? '启用' : '停用'}
          </Tag>
        )
      },
      minWidth: 100
    },
    // {
    //     title: '角色',
    //     align: 'center',
    //     key: 'deptName',
    //     render(h, { row }) {
    //       return (
    //         <span v-for={i in row.role}>
    //             {i.role}
    //         </span>
    //       )
    //     },
    //     minWidth: 100
    // },
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
              v-auth={509}
              on-click={_ => Vue.openFormMember('view', row)}
            >
              {'详情'}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              v-auth={507}
              on-click={_ => Vue.openFormMember('edit', row)}
            >
              {'编辑'}
            </Button>
            {
              row.status ? <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                v-auth={510}
                on-click={_ => Vue.openFormMember('delete', row)}
              >
                {'移出'}
              </Button> : ''
            }
          </div>
        )
      }
    }
  ]
}