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
      title: '货币',
      key: 'currency_type',
      align: 'center'
    },
    {
      title: '货币名称',
      key: 'currency_name',
      align: 'center'
    },


    // {
    //   title: '状态',
    //   minWidth: 50,
    //   align: 'center',
    //   render(h, { row }) {
    //     return (
    //       <div>
    //       { <Poptip
    //         confirm
    //         title={`确认${row.status == 0 ? '上架' : '下架'}`}
    //         on-on-ok={_ => Vue.handleStop(row)}
    //       >
            
    //         <Button
    //           v-btn={46}
    //           type={row.status === 0 ? 'error' : 'success'}
    //           size='small'
         
    //           style='margin-right:5px'
    //         >
    //           {row.status === 0 ? '已下架' : '已上架'}
    //         </Button>
    //       </Poptip>}
    //     </div>
    //     )
    //   }
    // },
    {
      title: '维护时间',
      key: 'updated_at',
      align: 'center'
    },

    {
      title: '操作',
      minWidth: 100,
      align: 'center',
      render(h, { row }) {
        return (
          <div>

            {/* <Poptip
              confirm
              title={`确认 ${row.status === 0 ? '启用' : '停用'} ?`}
              on-on-ok={_ => Vue.handleSwitch(row)}
            >
              <Button type={row.status === 1 ? 'error' : 'success'} size="small">
                {row.status === 0 ? '启用' : '停用'}
              </Button>
            </Poptip> */}

            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-auth={44}
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleView(row, 'agent')}
            >
              查看代理
            </Button>
            <Button
                type='primary'
                size='small'
                style='margin-right:5px'
                on-click={_ => Vue.handleView(row, 'gameManages')}
              >
                查看游戏厂商
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
