import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
      title: 'ID',
      key: 'id',
      align: 'center'
    },
    {
        title: '厂商',
        key: 'menu_type',
        align: 'center'
      },
   
    {
      title: '游戏ID',
      key: 'kind_id',
      align: 'center'
    },
    {
      title: '游戏名称',
      key: 'game_name',
      align: 'center'
    },
    {
      title: '游戏类型',
      key: 'game_type',
      align: 'center'
    },
    
    {
      title: '上架时间',
      key: 'created_at',
      minWidth: 140,
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
                v-btn={29}
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

    {
      title: '是否试玩',
      key: 'is_demo_str',
      minWidth: 30,
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
