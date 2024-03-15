import { Button, Tag, Poptip } from 'iview'

export default function (Vue) {
  const i18n = Vue.$t('adminRole')
  return [
    {
      title: i18n.adminRole31,
      align: 'center',
      key: 'id',
      minWidth: 100
    },
    {
      title: i18n.adminRole32,
      align: 'center',
      key: 'group_name',
      minWidth: 100
    },
    {
      title: i18n.adminRole33,
      align: 'center',
      key: 'role',
      minWidth: 100
    },
    {
      title: i18n.adminRole17+'ID',
      align: 'center',
      key: 'role_code',
      minWidth: 100
    },
    {
      title: i18n.adminRole34,
      align: 'center',
      key: 'num',
      minWidth: 100
    },
    {
      title: i18n.adminRole35,
      align: 'center',
      key: 'updated',
      minWidth: 100
    },
    {
      title: i18n.adminRole36,
      align: 'center',
      key: 'username',
      minWidth: 100
    },
    // {
    //   title: i18n.adminList37,
    //   align: 'center',
    //   key: 'status',
    //   render(h, { row }) {
    //     return (
    //       <Tag color={row.status === 0 ? 'success' : 'default'} type='dot'>
    //         {row.status === 0 ? '成功' : '停用'}
    //       </Tag>
    //     )
    //   },
    //   minWidth: 100
    // },
    {
      title: i18n.adminRole41,
      align: 'center',
      minWidth: 180,
      render(h, { row }) {
        return  Vue.group_name_code === row.group_name_code && row.is_default === 0 ?(
          <div>
            {/* <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {'查看管理密码'}
            </Button> */}
            <div >
              <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                v-auth={514}
                on-click={_ => Vue.handleView(row,'edit')}
              >
                {i18n.adminRole22}
              </Button>
              <Button
                type='primary'
                size='small'
                v-auth={515}
                style='margin-right:5px'
                on-click={_ => Vue.handleDelete(row)}
              >
                {i18n.adminRole24}
              </Button>
              
            </div>
            
          </div>
        ) : (
          <div>
            <Button
                type='primary'
                size='small'
                v-auth={516}
                style='margin-right:5px'
                on-click={_ => Vue.handleView(row,'view')}
              >
                {i18n.adminRole40}
              </Button>
            </div>
        )
      }
    }
  ]
}