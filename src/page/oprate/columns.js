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
      title: '操作模块',
      key: 'module',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '操作类型',
      key: 'method',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '操作人ID',
      key: 'admin_id',
      minWidth: 80,
      align: 'center'
    },
    {
        title: '操作人',
        key: 'admin_name',
        minWidth: 80,
        align: 'center'
    },
    {
      title: '操作状态',
      key: 'status',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '表记录ID',
      key: 'table_id',
      minWidth: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'created_at',
      minWidth: 120,
      align: 'center'
    },
    {
      title: '备注',
      key: 'remark',
      minWidth: 300,
      align: 'center'
    },
    // {
    //   title: '操作',
    //   minWidth: 100,
    //   align: 'center',
    //   render (h, { row }) {
    //     return (
    //       <div>
    //         <Button
    //           style="margin-right:5px"
    //           type="primary"
    //           size="small"
    //           on-click={_ => Vue.handleEdit(row, 'edit')}
    //         >
    //           编辑
    //         </Button>
    //         {/* <Poptip
    //           confirm
    //           title={`确认 ${row.status === 0 ? '启用' : '停用'} ?`}
    //           on-on-ok={_ => Vue.handleSwitch(row)}
    //         >
    //           <Button type={row.status === 1 ? 'error' : 'success'} size="small">
    //             {row.status === 0 ? '启用' : '停用'}
    //           </Button>
    //         </Poptip>

    //         <Button    style="margin-left:5px" size="small" type="primary"   on-click={_ => Vue.onGameManage(row)}>
    //             游戏管理
    //           </Button> */}
    //       </div>
    //     )
    //   },
    //   myExt: {
    //     label: 'handle',
    //     require: true
    //   }
    // }
  ]
}