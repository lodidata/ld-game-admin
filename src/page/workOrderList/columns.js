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
        title: '标题',
        key: 'title',
        minWidth: 200,
        align: 'center'
    },
   
    {
      title: '创建者',
      key: 'created_admin',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'created_at',
      minWidth: 150,
      align: 'center'
    },
    {
      title: '状态',
      key: "status_str",
      minWidth: 80,
      align: 'center',
    },
    {
      title: '解决人',
      key: 'finished_admin',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '解决时间',
      key: 'finished_at',
      minWidth: 150,
      align: 'center'
    },
    {
      title: '操作',
      minWidth: 250,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              v-auth={76}
              style="margin-right:5px"
              type="text"
              size="small"
              on-click={_ => Vue.handleEdit(row)}
            >
              编辑
            </Button>
            <Button
              v-auth={78}
              style="margin-right:5px"
              type="text"
              size="small"
              on-click={_ => Vue.handleDetail(row)}
            >
              详情
            </Button>
            {
              row.button_permission_list.confirm ? <Button v-auth={77} type="text" size="small" on-click={_ => Vue.handleStatus(row, 2, '确认')}>
                  确认
                </Button> : <Button v-auth={77}  type="text" size="small" disabled>
                  确认
              </Button>
            }
            {
              row.button_permission_list.activated ? <Button v-auth={77}  type="text" size="small" on-click={_ => Vue.handleStatus(row, 5, '激活')}>
                  激活
                </Button> : ''
            }
            {
              row.button_permission_list.solve ? <Button v-auth={77} type="text" size="small" on-click={_ => Vue.handleStatus(row, 3, '解决')}>
                  解决
                </Button> : <Button v-auth={77} type="text" size="small" disabled>
                  解决
              </Button>
            }
            {
              row.button_permission_list.close ? <Button v-auth={77} type="text" size="small" on-click={_ => Vue.handleStatus(row, 4, '关闭')}>
                  关闭
                </Button> : <Button v-auth={77} type="text" size="small" disabled>
                  关闭
              </Button>
            }
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