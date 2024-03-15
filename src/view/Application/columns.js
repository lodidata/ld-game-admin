export const level_1_list = function(Vue) {
  const i18n = Vue.$t('application')
  return [
    {
      title: `${i18n.application15}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    // {
    //   title: `${i18n.application35}`,//上级
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'uid_agent_name'
    // },
    {
      title: `${i18n.application16}`,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'level'
    },
    // {
    //   title: `${i18n.application17}`,//联系类型
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'contact_type'
    // },
    // {
    //   title: `${i18n.application18}`,//联系方式
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'contact_value'
    // },
    // {
    //   title: `${i18n.application19}`,//申请理由
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'reason'
    // },
    {
      title: `${i18n.application20}`,//申请时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.application21}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render: (h, { row }) => {
        return (
          <span>
            { row.status == 0 ? `${i18n.application22}` : ''}
            { row.status == 1 ? `${i18n.application23}` : ''}
            { row.status == 2 ? `${i18n.application24}` : ''}
          </span>
        )
      }
    },
    {
      title: `${i18n.application25}`,//操作时间
      align: 'center',
      minWidth: 100,
      key: 'operate_time'
    },
    {
      title: `${i18n.application34}`,//消息回复
      align: 'center',
      minWidth: 100,
      key: 'reply'
    },
    {
      title: `${i18n.application26}`,//备注
      align: 'center',
      minWidth: 100,
      key: 'remark'
    },
    {
      title: `${i18n.application27}`,//操作者
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    },
    {
      title: `${i18n.application28}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        row.status == 0 ? h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handle(row)
              }
            }
          },
          `${i18n.application28}`
        ) : h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleLook(row)
              }
            }
          },
          `${i18n.application31}`
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.application29}`
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
              `${i18n.application30}`
            )
          ]
        )
      ]
    }
  ]
}

export const subordinate_list = function(Vue) {
  const i18n = Vue.$t('application')
  return [
    {
      title: `${i18n.application15}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    // {
    //   title: `${i18n.application35}`,//上级
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'uid_agent_name'
    // },
    {
      title: `${i18n.application16}`,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'level'
    },
    {
      title: `${i18n.application39}`,//上级代理
      align: 'center',
      minWidth: 100,
      key: 'uid_agent_name'
    },
    // {
    //   title: `${i18n.application17}`,//联系类型
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'contact_type'
    // },
    // {
    //   title: `${i18n.application18}`,//联系方式
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'contact_value'
    // },
    // {
    //   title: `${i18n.application19}`,//申请理由
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'reason'
    // },
    {
      title: `${i18n.application20}`,//申请时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.application21}`,//状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render: (h, { row }) => {
        return (
          <span>
            { row.status == 0 ? `${i18n.application22}` : ''}
            { row.status == 1 ? `${i18n.application23}` : ''}
            { row.status == 2 ? `${i18n.application24}` : ''}
          </span>
        )
      }
    },
    {
      title: `${i18n.application25}`,//操作时间
      align: 'center',
      minWidth: 100,
      key: 'operate_time'
    },
    {
      title: `${i18n.application34}`,//消息回复
      align: 'center',
      minWidth: 100,
      key: 'reply'
    },
    {
      title: `${i18n.application26}`,//备注
      align: 'center',
      minWidth: 100,
      key: 'remark'
    },
    {
      title: `${i18n.application27}`,//操作者
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    },
    {
      title: `${i18n.application28}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        row.status == 0 ? h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handle(row)
              }
            }
          },
          `${i18n.application28}`
        ) : h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleLook(row)
              }
            }
          },
          `${i18n.application31}`
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.application29}`
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
              `${i18n.application30}`
            )
          ]
        )
      ]
    }
  ]
}
