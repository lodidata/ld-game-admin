import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
        title: 'IP地址',
        key: 'ip',
        align: 'center'
    },
    {
        title: '操作员',
        key: 'admin_name',
        align: 'center'
    },
    {
      title: '操作',
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              v-auth={18}
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleDelete(row)}
            >
              删除
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