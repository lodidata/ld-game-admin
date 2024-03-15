import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    // {
    //   title: '账号ID',
    //   key: 'name',
    //   align: 'center'
    // },
    {
      title: 'ID',
      key: 'id',
      align: 'center'
    },
    {
        title: '游戏类型',
        key: 'type_code',
        align: 'center'
      },
    {
      title: '名称',
      key: 'type_name',
      align: 'center'
    },
    
    
    {
      title: '状态',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
          { <Poptip
            confirm
            title={`确认${row.status == 0 ? '上架' : '下架'}`}
            on-on-ok={_ => Vue.handleStop(row)}
          >
            
            <Button
              v-btn={41}
              type={row.status === 0 ? 'error' : 'success'}
              size='small'
         
              style='margin-right:5px'
            >
              {row.status === 0 ? '已下架' : '已上架'}
            </Button>
          </Poptip>}
        </div>
        )
      }
    },
  
    // {
    //   title: '维护时间',
    //   key: 'updated_at',
    //   minWidth: 140,
    //   align: 'center'
    // },
    // {
    //   title: '操作',
    //   minWidth: 100,
    //   align: 'center',
    //   render (h, { row }) {
    //     return (
    //       <div>
           
    //         {/* <Poptip
    //           confirm
    //           title={`确认 ${row.status === 0 ? '启用' : '停用'} ?`}
    //           on-on-ok={_ => Vue.handleSwitch(row)}
    //         >
    //           <Button type={row.status === 1 ? 'error' : 'success'} size="small">
    //             {row.status === 0 ? '启用' : '停用'}
    //           </Button>
    //         </Poptip> */}

    //         <Button
    //           style="margin-left:5px"
    //           type="primary"
    //           size="small"
    //           v-auth={57}
    //           on-click={_ => Vue.handleEdit(row, 'edit')}
    //         >
    //           编辑
    //         </Button>
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
