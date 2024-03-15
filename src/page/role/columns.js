import { Button, Poptip } from 'iview'

export default function(Vue) {

  return [
    {
      title: '角色',
      key: 'role_name',
      align: 'center'
    },
    {
      title: "人数",
      key: 'num',
      align: 'center',
      sortable: true
    },
    {
      title: "建立时间",
      key: 'created_at',
      align: 'center'
    },
    {
      title: "操作者",
      key: 'operator',
      align: 'center'
    },
    {
      title:  "操作",
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              size='small'
              type='primary'
              v-auth={57}
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
            编辑
            </Button>
            <Poptip confirm title={`删除角色 ${row.role_name} ?`} on-on-ok={_ => Vue.handleDetele(row)}>
              <Button size='small' type='error'   v-auth={58}>
              删除
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
